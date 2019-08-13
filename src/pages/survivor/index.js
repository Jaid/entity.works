import React from "react"
import PropTypes from "prop-types"
import CharacterPage from "components/CharacterPage"
import survivors from "lib/survivors"
import DocumentTitle from "react-document-title"
import paramCase from "param-case"
import camelCase from "camel-case"

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
    console.log(survivors)
    const info = findSurvivor(this.props.match.params.id)
    if (!info) {
      return "No survivor found."
    }
    const description = info.title
    return <DocumentTitle title={`${info.title} in Dead by Daylight`}>
      <CharacterPage description={description} info={info} type="survivor"/>
    </DocumentTitle>
  }

}