import {camelCase} from "camel-case"
import {paramCase} from "param-case"
import PropTypes from "prop-types"
import React from "react"
import {Helmet} from "react-helmet"
import zahl from "zahl"

import Killer from "lib/Killer"
import {flattenRichText} from "lib/normalizeRichText"
import Perk from "lib/Perk"
import CharacterPage from "src/components/CharacterPage"
import Title from "src/components/Title"

import css from "./style.scss"

/**
  * @typedef {{
  *  match: {
  *    isExact: boolean
  *    path: string
  *    url: string
  *    params: object.<string, string>
  *  },
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class KillerPage extends React.Component {

  static propTypes = {
    match: PropTypes.exact({
      isExact: PropTypes.bool.isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      params: PropTypes.object,
    }).isRequired,
  }

  getFullDescription(killer) {
    const perks = Perk.findByOwner(killer.id)
    return `Dead by Daylight killer ${killer.shortTitle}. Has ${zahl(perks, "perk")}: ${perks.map(perk => perk.title).join(", ")}. ${flattenRichText(killer.richEffect, killer.shortTitle)}`
  }

  render() {
    const killer = Killer.find(this.props.match.params.id)
    if (!killer) {
      return `No killer found for "${this.props.match.params.id}".`
    }
    const description = `POWER: ${killer.powerTitle}\n\n${killer.richEffect}`
    return <main>
      <Helmet>
        <title>{killer.title} | Dead by Daylight Killer</title>
        <meta content={this.getFullDescription(killer)} name="description"/>
      </Helmet>
      <CharacterPage description={description} info={killer} type="killer"/>
    </main>
  }

}