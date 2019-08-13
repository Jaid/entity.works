import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import perks from "lib/perks"
import PerkBlock from "components/PerkBlock"
import RelevantPatches from "components/RelevantPatches"
import DocumentTitle from "react-document-title"
import paramCase from "param-case"
import camelCase from "camel-case"

import css from "./style.scss"

/**
 * @param {string} query
 * @return {import("../../lib/perks").perk}
 */
const findPerk = query => {
  return perks.find(perk => perk.linkId === query)
  || perks.find(perk => paramCase(perk.title) === query)
  || perks.find(perk => camelCase(perk.title) === query)
  || perks.find(perk => paramCase(perk.ingameId) === query)
  || perks.find(perk => camelCase(perk.ingameId) === query)
}

/**
  * @typedef {{
  *  className: *
  *  match: {
  *    isExact: boolean
  *    path: string
  *    url: string
  *    params: object.<string, string>
  *  }
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class PerkPage extends React.Component {

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
    const info = findPerk(this.props.match.params.id)
    if (!info) {
      return "No perk found."
    }
    return <DocumentTitle title={`${info.title} in Dead by Daylight`}>
      <main className={classnames(css.container, this.props.className)}>
        <PerkBlock perkInfo={info}/>
        <RelevantPatches name={info.id} type="perks"/>
      </main>
    </DocumentTitle>
  }

}