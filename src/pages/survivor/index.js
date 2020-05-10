import {camelCase} from "camel-case"
import {paramCase} from "param-case"
import PropTypes from "prop-types"
import React from "react"
import {Helmet} from "react-helmet"
import zahl from "zahl"

import Perk from "lib/Perk"
import Survivor from "lib/Survivor"
import CharacterPage from "src/components/CharacterPage"

import css from "./style.scss"

// /**
//  * @param {string} query
//  * @return {import("../../lib/survivors").survivor}
//  */
// const findSurvivor = query => {
//   return survivors.find(survivor => survivor.linkId === query)
//   || survivors.find(survivor => paramCase(survivor.title) === query)
//   || survivors.find(survivor => camelCase(survivor.title) === query)
//   || survivors.find(survivor => paramCase(survivor.shortTitle) === query)
//   || survivors.find(survivor => camelCase(survivor.shortTitle) === query)
// }

/**
  * @typedef {{
  *  className: *,
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
export default class SurvivorPage extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    match: PropTypes.exact({
      isExact: PropTypes.bool.isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      params: PropTypes.object,
    }).isRequired,
  }

  getFullDescription(survivor) {
    const perks = Perk.findByOwner(survivor.id)
    return `Dead by Daylight survivor ${survivor.title}. Has ${zahl(perks, "perk")}: ${perks.map(perk => perk.title).join(", ")}.`
  }

  render() {
    const survivor = Survivor.find(this.props.match.params.id)
    if (!survivor) {
      return `No survivor found for "${this.props.match.params.id}".`
    }
    return <main>
      <Helmet>
        <title>{survivor.title} | Dead by Daylight Survivor</title>
        <meta content={this.getFullDescription(survivor)} name="description"/>
      </Helmet>
      <CharacterPage description={survivor.title} info={survivor} type="survivor"/>
    </main>
  }

}