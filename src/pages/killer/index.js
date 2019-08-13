import React from "react"
import PropTypes from "prop-types"
import CharacterPage from "components/CharacterPage"
import killers from "lib/killers"
import DocumentTitle from "react-document-title"
import paramCase from "param-case"
import camelCase from "camel-case"

import css from "./style.scss"

/**
 * @param {string} query
 * @return {import("../../lib/killers").killer}
 */
const findKiller = query => {
  return killers.find(killer => killer.linkId === query)
  || killers.find(killer => killer.shortTitle === paramCase(query))
  || killers.find(killer => killer.shortTitle === camelCase(query))
  || killers.find(killer => killer.title === paramCase(query))
  || killers.find(killer => killer.title === camelCase(query))
  || killers.find(killer => killer.fullName === paramCase(query))
  || killers.find(killer => killer.fullName === camelCase(query))
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
      return
    }
    const description = `POWER: ${info.powerTitle}\n\n${info.power}`
    return <DocumentTitle title={`${info.title} in Dead by Daylight`}>
      <CharacterPage description={description} info={info} type="killer"/>
    </DocumentTitle>
  }

}