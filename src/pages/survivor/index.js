import {camelCase} from "camel-case"
import {paramCase} from "param-case"
import PropTypes from "prop-types"
import React from "react"
import {Helmet} from "react-helmet"

import survivors from "lib/survivors"
import CharacterPage from "components/CharacterPage"

import css from "./style.scss"

/**
 * @param {string} query
 * @return {import("../../lib/survivors").survivor}
 */
const findSurvivor = query => {
  return survivors.find(survivor => survivor.linkId === query)
  || survivors.find(survivor => paramCase(survivor.title) === query)
  || survivors.find(survivor => camelCase(survivor.title) === query)
  || survivors.find(survivor => paramCase(survivor.shortTitle) === query)
  || survivors.find(survivor => camelCase(survivor.shortTitle) === query)
}

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

  render() {
    const info = findSurvivor(this.props.match.params.id)
    if (!info) {
      return "No survivor found."
    }
    return <main>
      <Helmet>
        <title>{info.title} | Dead by Daylight Survivor</title>
      </Helmet>
      <CharacterPage description={info.title} info={info} type="survivor"/>
    </main>
  }

}