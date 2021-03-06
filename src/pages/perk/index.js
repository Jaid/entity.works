import {camelCase} from "camel-case"
import classnames from "classnames"
import {paramCase} from "param-case"
import PropTypes from "prop-types"
import React from "react"
import {Helmet} from "react-helmet"

import {flattenRichText} from "lib/normalizeRichText"
import Perk from "lib/Perk"
import FilteredBuilds from "src/components/FilteredBuilds"
import PatchesForReferenceText from "src/components/PatchesForReferenceText"
import PerkBlock from "src/components/PerkBlock"
import Title from "src/components/Title"

import css from "./style.scss"

// /**
//  * @param {string} query
//  * @return {import("../../lib/perks").Perk}
//  */
// const findPerk = query => {
//   return perks.find(perk => perk.linkId === query)
//   || perks.find(perk => paramCase(perk.title) === query)
//   || perks.find(perk => camelCase(perk.title) === query)
//   || perks.find(perk => paramCase(perk.ingameId) === query)
//   || perks.find(perk => camelCase(perk.ingameId) === query)
// }

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

  getFullDescription(perk) {
    return `Dead by Daylight perk ${perk.title}. ${flattenRichText(perk.richEffect, perk.title)}`
  }

  render() {
    const perk = Perk.find(this.props.match.params.id)
    if (!perk) {
      return `No perk found for "${this.props.match.params.id}".`
    }
    return <main>
      <Helmet>
        <title>{perk.title} | Dead by Daylight Perk</title>
        <meta content={this.getFullDescription(perk)} name="description"/>
      </Helmet>
      <Title>{perk.title}</Title>
      <PerkBlock perkId={perk.id} displayOwnerBox/>
      <PatchesForReferenceText className={css.patchesText} referenceId={perk.id}/>
      <FilteredBuilds className={css.filteredBuilds} filterType="perk" limit={3} value={perk.id}/>
    </main>
  }

}