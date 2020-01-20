import {camelCase} from "camel-case"
import {paramCase} from "param-case"
import PropTypes from "prop-types"
import React from "react"
import {Helmet} from "react-helmet"

import killers from "lib/killers"
import CharacterPage from "components/CharacterPage"
import Title from "components/Title"

import css from "./style.scss"

/**
 * @param {string} query
 * @return {import("../../lib/killers").killer}
 */
const findKiller = query => {
  return killers.find(killer => killer.linkId === query)
  || killers.find(killer => paramCase(killer.shortTitle) === query)
  || killers.find(killer => camelCase(killer.shortTitle) === query)
  || killers.find(killer => paramCase(killer.title) === query)
  || killers.find(killer => camelCase(killer.title) === query)
  || killers.find(killer => paramCase(killer.fullName) === query)
  || killers.find(killer => camelCase(killer.fullName) === query)
}

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

  render() {
    const info = findKiller(this.props.match.params.id)
    if (!info) {
      return "No killer found."
    }
    const description = `POWER: ${info.powerTitle}\n\n${info.power}`
    return <main>
      <Helmet>
        <title>{info.title} | Dead by Daylight Killer</title>
      </Helmet>
      <CharacterPage description={description} info={info} type="killer"/>
    </main>
  }

}