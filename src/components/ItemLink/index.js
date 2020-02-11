import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import {Link} from "react-router-dom"

import findObject from "lib/findObject"

import css from "./style.scss"

/**
  * @typedef {{
  *  className: *,
  *  itemId: string,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class ItemLink extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    children: PropTypes.node,
    itemId: PropTypes.string.isRequired,
  }

  render() {
    const item = findObject(this.props.itemId)
    return <Link className={classnames(css.container, this.props.className)} to={`/item/${item.linkId}`}>
      {this.props.children}
    </Link>
  }

}