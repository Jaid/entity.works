import PropTypes from "prop-types"
import React from "react"
import reactStringReplace from "react-string-replace"

import AddOn from "lib/AddOn"
import Item from "lib/Item"
import Killer from "lib/Killer"
import Perk from "lib/Perk"
import AddOnImage from "components/AddOnImage"
import AddOnLink from "components/AddOnLink"
import ItemImage from "components/ItemImage"
import ItemLink from "components/ItemLink"
import PerkImage from "components/PerkImage"
import PerkLink from "components/PerkLink"
import RichText from "components/RichText"
import SmallerTitle from "components/SmallerTitle"

import gamepediaData from "src/aotLoaders/gamepedia?aot"

import css from "./style.scss"

/**
  * @typedef {Object} Props
  * @prop {Object} match
  * @prop {boolean} match.isExact
  * @prop {string} match.path
  * @prop {string} match.url
  * @prop {Object} match.params
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class ComparePage extends React.Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  getGamepediaPerkEffect(id) {
    const text = gamepediaData?.perks?.[id]
    if (!text) {
      return null
    }
    const formattedText = reactStringReplace(text, "\n", () => {
      return <div className={css.lineBreak}/>
    })
    return formattedText
  }

  getGamepediaAddOnEffect(id) {
    const text = gamepediaData?.addOns?.[id]
    if (!text) {
      return null
    }
    const formattedText = reactStringReplace(text, "\n", () => {
      return <div className={css.lineBreak}/>
    })
    return formattedText
  }

  getGamepediaKillerAddOnEffect(killerId, addOnId) {
    const text = gamepediaData?.killers?.[killerId]?.addOns?.[addOnId]
    if (!text) {
      return null
    }
    const formattedText = reactStringReplace(text, "\n", () => {
      return <div className={css.lineBreak}/>
    })
    return formattedText
  }

  getGamepediaItemEffect(id) {
    const text = gamepediaData?.items?.[id]
    if (!text) {
      return null
    }
    const formattedText = reactStringReplace(text, "\n", () => {
      return <div className={css.lineBreak}/>
    })
    return formattedText
  }

  getPerks() {
    const elements = Perk.allVisible.map(perk => {
      return <tr key={perk.id}>
        <td className={css.iconTd}>
          <PerkImage height="40px" perkId={perk.id}/>
        </td>
        <td>
          <PerkLink perkId={perk.id}/>
          <br/><br/>
          <RichText>{perk.richEffect}</RichText>
        </td>
        <td>
          <div className={css.gamepediaEffect}>
            {this.getGamepediaPerkEffect(perk.id)}
          </div>
        </td>
      </tr>
    })
    return elements
  }

  getItems() {
    const elements = Item.allVisible.map(item => {
      return <tr key={item.id}>
        <td className={css.iconTd}>
          <ItemImage height="40px" itemId={item.id}/>
        </td>
        <td>
          <ItemLink itemId={item.id}>{item.title}</ItemLink>
          <br/><br/>
          <RichText>{item.richEffect}</RichText>
        </td>
        <td>
          <div className={css.gamepediaEffect}>
            {this.getGamepediaItemEffect(item.id)}
          </div>
        </td>
      </tr>
    })
    return elements
  }

  getAddOns() {
    const elements = AddOn.forItem.map(addOn => {
      return <tr key={addOn.id}>
        <td className={css.iconTd}>
          <AddOnImage addOnId={addOn.id} height="40px"/>
        </td>
        <td>
          <AddOnLink addOnId={addOn.id}>{addOn.title}</AddOnLink>
          <br/><br/>
          <RichText>{addOn.richEffect}</RichText>
        </td>
        <td>
          <div className={css.gamepediaEffect}>
            {this.getGamepediaAddOnEffect(addOn.id)}
          </div>
        </td>
      </tr>
    })
    return elements
  }

  getKiller(killer) {
    const addOns = AddOn.allVisible.filter(addOn => {
      return addOn.for === killer.id
    })
    const rows = addOns.map(addOn => {
      return <tr key={addOn.id}>
        <td className={css.iconTd}>
          <AddOnImage addOnId={addOn.id} height="40px"/>
        </td>
        <td>
          <AddOnLink addOnId={addOn.id}>{addOn.title}</AddOnLink>
          <br/><br/>
          <RichText>{addOn.richEffect}</RichText>
        </td>
        <td>
          <div className={css.gamepediaEffect}>
            {this.getGamepediaKillerAddOnEffect(killer.id, addOn.id)}
          </div>
        </td>
      </tr>
    })
    return <div>
      <SmallerTitle>{killer.shortTitle} Add-Ons</SmallerTitle>
      <table className={css.table}>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  }

  render() {
    if (!gamepediaData) {
      return "No data cached."
    }
    console.log(gamepediaData)
    return <main className={css.container}>
      <SmallerTitle>Perks</SmallerTitle>
      <table className={css.table}>
        <tbody>
          {this.getPerks()}
        </tbody>
      </table>
      <SmallerTitle>Items</SmallerTitle>
      <table className={css.table}>
        <tbody>
          {this.getItems()}
        </tbody>
      </table>
      <SmallerTitle>Item Add-Ons</SmallerTitle>
      <table className={css.table}>
        <tbody>
          {this.getAddOns()}
        </tbody>
      </table>
      {Killer.allVisible.map(killer => this.getKiller(killer))}
    </main>
  }

}