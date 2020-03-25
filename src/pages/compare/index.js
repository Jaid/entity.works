import PropTypes from "prop-types"
import React from "react"
import reactStringReplace from "react-string-replace"

import Perk from "lib/Perk"
import PerkImage from "components/PerkImage"
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

  getGamepediaEffect(id) {
    const text = gamepediaData?.perks?.[id]
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
        <td>
          <PerkImage height="40px" perkId={perk.id}/>
        </td>
        <td>
          {perk.title}<br/><br/>
          <RichText>{perk.richEffect}</RichText>
        </td>
        <td>
          <div className={css.gamepediaEffect}>
            {this.getGamepediaEffect(perk.id)}
          </div>
        </td>
      </tr>
    })
    return elements
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
    </main>
  }

}