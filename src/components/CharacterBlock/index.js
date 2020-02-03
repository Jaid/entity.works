import PropTypes from "prop-types"
import React from "react"
import Picture from "react-modern-picture"

import findObject from "lib/findObject"
import Killer from "lib/Killer"
import Survivor from "lib/Survivor"
import Headline from "components/Headline"
import KillerLink from "components/KillerLink"
import RichText from "components/RichText"
import SurvivorLink from "components/SurvivorLink"

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
  *  characterId: string
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
    characterId: PropTypes.string.isRequired,
  }

  getLink(character) {
    const Link = character.type === "killer" ? KillerLink : SurvivorLink
    return <div className={css.characterTitle}>
      <Link info={character}>{character.title}</Link>
    </div>
  }

  getRichDescription(character) {
    if (character.type === "killer") {
      return `POWER: ${character.powerTitle}\n\n${character.richEffect}`
    }
    return ""
  }

  render() {
    const character = findObject(this.props.characterId)
    const myMeta = meta[character.type]
    const imgSrc = require(`../../data/${myMeta.referenceType}/${this.props.characterId}/icon.png`).default
    let overText = null
    if (myMeta.overTextKey) {
      overText = character[myMeta.overTextKey] || myMeta.overText
    } else {
      overText = myMeta.overText
    }
    return <div>
      <Headline miniText={overText} theme={character.type}>
        {character[myMeta.titleKey]}
      </Headline>
      <div className={css.introduction}>
        <Picture className={css.icon} input={imgSrc}/>
        <div className={css.description}>
          {this.getLink(character)}
          <RichText>{this.getRichDescription(character)}</RichText>
        </div>
      </div>
    </div>
  }

}