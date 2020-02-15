import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import {Link} from "react-router-dom"

import findObject from "lib/findObject"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class PatchBox extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    patchId: PropTypes.string.isRequired,
  }

  render() {
    const patch = findObject(this.props.patchId)
    return <Link to={`/patch/${patch.linkId}`}>{patch.title}</Link>
  }

}