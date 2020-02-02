import PropTypes from "prop-types"
import React from "react"
import Picture from "react-modern-picture"
import zahl from "zahl"

import AddOn from "lib/AddOn"
import findObject from "lib/findObject"
import Killer from "lib/Killer"
import Perk from "lib/Perk"
import Survivor from "lib/Survivor"
import AddOnBlock from "components/AddOnBlock"
import Headline from "components/Headline"
import NavigationPage from "components/NavigationPage"
import PatchesForReferenceText from "components/PatchesForReferenceText"
import PerkBlock from "components/PerkBlock"
import RichText from "components/RichText"
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
    const imgSrc = require(`../../data/${myMeta.referenceType}/${this.props.info.id}/icon.png`).default
    let overText = null
    if (myMeta.overTextKey) {
      overText = this.props.info[myMeta.overTextKey] || myMeta.overText
    } else {
      overText = myMeta.overText
    }
    return <NavigationPage links={links}>
      <Title>{this.props.info[myMeta.titleKey]}</Title>
      <Headline miniText={overText} theme={this.props.type}>
        {this.props.info[myMeta.titleKey]}
      </Headline>
      <div className={css.introduction}>
        <Picture className={css.icon} input={imgSrc}/>
        <RichText className={css.description}>{this.props.description}</RichText>
      </div>
      <PatchesForReferenceText className={css.patchesText} referenceId={this.props.info.id}/>
      {this.getPerks(character)}
      {this.getAddOns(character)}
    </NavigationPage>
  }

}