import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import {Helmet} from "react-helmet"
import {NavLink} from "react-router-dom"

import Patch from "lib/Patch"
import NavigationPage from "components/NavigationPage"
import PatchBlock from "components/PatchBlock"
import Title from "components/Title"

import css from "./style.scss"

// /**
//  * @param {string} query
//  * @return {import("../../lib/patches").patch}
//  */
// const findPatch = query => {
//   return patches.find(patch => patch.linkId === query)
//   || patches.find(patch => patch.semver === query)
// }

/**
  * @typedef {{
  *  className: *
  *  match: {
  *    isExact: boolean
  *    path: string
  *    url: string
  *    params: {version: string}
  *  }
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class PatchPage extends React.Component {

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
    const links = Patch.all.map(patch => ({
      to: `/patch/${patch.linkId}`,
      text: patch.semver,
    }))
    const patch = Patch.find(this.props.match.params.version)
    if (!patch) {
      return `No patch found for "${this.props.match.params.id}".`
    }
    return <main>
      <Helmet>
        <title>{patch.semver} | Dead by Daylight Patch Notes</title>
      </Helmet>
      <NavigationPage links={links}>
        <Title>{patch.title || `Patch ${patch.semver}`}</Title>
        <PatchBlock patchId={patch.id}/>
      </NavigationPage>
    </main>
  }

}