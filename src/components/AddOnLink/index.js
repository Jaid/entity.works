import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import {Link} from "react-router-dom"

import AddOn from "lib/AddOn"
import findObject from "lib/findObject"

import css from "./style.scss"

/**
  * @typedef {{
  *  className: *,
  *  addOnId: string,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class AddOnLink extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    children: PropTypes.node,
    addOnId: PropTypes.string.isRequired,
  }

  render() {
    const addOn = findObject(this.props.addOnId)
    return <Link className={classnames(css.container, this.props.className)} to={`/add-on/${addOn.linkId}`}>
      {this.props.children}
    </Link>
  }

}