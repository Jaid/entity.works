import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import {Link} from "react-router-dom"
import patches from "lib/patches"

import css from "./style.scss"

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
export default class PatchesPage extends React.Component {

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
    const links = patches.map(patch => <div key={patch.semver}><Link to={`/patch/${patch.linkId}`}>{patch.semver}</Link></div>)
    return <main className={classnames(css.container, this.props.className)}>
      {links}
    </main>
  }

}