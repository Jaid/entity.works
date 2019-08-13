import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import patches from "lib/patches"
import PatchBlock from "components/PatchBlock"
import {NavLink} from "react-router-dom"
import DocumentTitle from "react-document-title"
import NavigationPage from "components/NavigationPage"

import css from "./style.scss"

/**
 * @param {string} query
 * @return {import("../../lib/patches").patch}
 */
const findPatch = query => {
  return patches.find(patch => patch.linkId === query)
  || patches.find(patch => patch.semver === query)
}

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
    const links = patches.map(patch => ({
      to: `/patch/${patch.linkId}`,
      text: patch.semver,
    }))
    const patch = findPatch(this.props.match.params.version)
    if (!patch) {
      return "No patch found."
    }
    return <DocumentTitle title={`Patch ${patch.semver} in Dead by Daylight`}>
      <NavigationPage links={links}>
        <PatchBlock patch={patch}/>
      </NavigationPage>
    </DocumentTitle>
  }

}