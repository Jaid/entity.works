import {camelCase} from "camel-case"
import classnames from "classnames"
import {paramCase} from "param-case"
import PropTypes from "prop-types"
import React from "react"
import DocumentTitle from "react-document-title"

import perks from "lib/perks"
import PatchesForReferenceText from "components/PatchesForReferenceText"
import PerkBlock from "components/PerkBlock"

import css from "./style.scss"

/**
 * @param {string} query
 * @return {import("../../lib/perks").Perk}
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
    const perk = findPerk(this.props.match.params.id)
    if (!perk) {
      return `No perk with id ${this.props.match.params.id} found.`
    }
    return <DocumentTitle title={`${perk.title} · Dead by Daylight Perk`}>
      <main className={classnames(css.container, this.props.className)}>
        <PerkBlock perkInfo={perk} displayOwnerBox/>
        <PatchesForReferenceText className={css.patchesText} referenceId={perk.id}/>
      </main>
    </DocumentTitle>
  }

}