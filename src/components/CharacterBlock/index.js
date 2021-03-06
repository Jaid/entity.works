import PropTypes from "prop-types"
import React from "react"
import Picture from "react-modern-picture"

import findObject from "lib/findObject"
import Killer from "lib/Killer"
import Survivor from "lib/Survivor"
import Headline from "src/components/Headline"
import KillerLink from "src/components/KillerLink"
import PowerImage from "src/components/PowerImage"
import RichText from "src/components/RichText"
import SurvivorLink from "src/components/SurvivorLink"

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

  getDescription(character) {
    if (character.type === "killer") {
      return <div>
        <PowerImage className={css.powerImage} height="3em" killerId={character.id}/>
        <span className={css.powerTitle}>{character.powerTitle}</span>
        <RichText className={css.powerDescription}>{character.richEffect}</RichText>
      </div>
    }
    return null
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
          {this.getDescription(character)}
        </div>
      </div>
    </div>
  }

}