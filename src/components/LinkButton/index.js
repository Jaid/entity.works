import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import {Link} from "react-router-dom"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   children: *,
  *   to: string
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class LinkButton extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    children: PropTypes.node,
    to: PropTypes.string,
  }

  render() {
    return <Link className={classnames(css.container, this.props.className)} to={this.props.to}>
      {this.props.children}
    </Link>
  }

}