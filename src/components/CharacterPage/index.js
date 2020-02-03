import PropTypes from "prop-types"
import React from "react"
import zahl from "zahl"

import AddOn from "lib/AddOn"
import findObject from "lib/findObject"
import getRarityIndex from "lib/getRarityIndex"
import Killer from "lib/Killer"
import Perk from "lib/Perk"
import Survivor from "lib/Survivor"
import AddOnBlock from "components/AddOnBlock"
import CharacterBlock from "components/CharacterBlock"
import NavigationPage from "components/NavigationPage"
import PatchesForReferenceText from "components/PatchesForReferenceText"
import PerkBlock from "components/PerkBlock"
import Title from "components/Title"

import css from "./style.scss"

const meta = {
  killer: {
    list: Killer.allVisible,
    referenceType: "killers",
    navigationTitleKey: "shortTitle",
    titleKey: "title",
    overText: "Killer",
    overTextKey: "realName",
  },
  survivor: {
    list: Survivor.allVisible,
    referenceType: "survivors",
    navigationTitleKey: "shortTitle",
    titleKey: "title",
    overText: "Survivor",
  },
}

const collator = new Intl.Collator("en")

function sortAddOns(addOn1, addOn2) {
  const rarityIndexDifference = getRarityIndex(addOn1.rarity) - getRarityIndex(addOn2.rarity)
  if (rarityIndexDifference !== 0) {
    return rarityIndexDifference
  }
  return collator.compare(addOn1.title, addOn2.title)
}

/**
  * @typedef {{
  *  className: *,
  *  type: string
  *  info: Object,
  *  description: string
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class CharacterPage extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    type: PropTypes.string.isRequired,
    info: PropTypes.object.isRequired,
    description: PropTypes.string,
  }

  getPerks(character) {
    const ownPerks = Perk.findByOwner(this.props.info.id)
    const perkNodes = ownPerks.map(perk => {
      return <PerkBlock key={perk.id} className={css.perk} perkInfo={perk}/>
    })
    return <section className={css.perksSection}>
      <Title>{zahl(perkNodes, `${character.shortTitle || character.title} perk`)}</Title>
      {perkNodes}
    </section>
  }

  getAddOns(character) {
    if (this.props.type === "survivor") {
      return null
    }
    const addOns = AddOn.findByOwner(this.props.info.id)
    addOns.sort(sortAddOns)
    const addOnBlocks = addOns.map(addOn => {
      return <AddOnBlock key={addOn.id} addOnId={addOn.id}/>
    })
    return <section className={css.addOnsSection}>
      <Title>{zahl(addOnBlocks, `${character.shortTitle || character.title} add-on`)}</Title>
      {addOnBlocks}
    </section>
  }

  render() {
    const myMeta = meta[this.props.type]
    const links = myMeta.list.map(character => ({
      to: `/${this.props.type}/${character.linkId}`,
      text: character[myMeta.navigationTitleKey],
    }))
    const character = findObject(this.props.info.id)
    return <NavigationPage links={links}>
      <Title>{this.props.info[myMeta.titleKey]}</Title>
      <CharacterBlock characterId={this.props.info.id}/>
      <PatchesForReferenceText className={css.patchesText} referenceId={this.props.info.id}/>
      {this.getPerks(character)}
      {this.getAddOns(character)}
    </NavigationPage>
  }

}