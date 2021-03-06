import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import {Link} from "react-router-dom"

import css from "./style.scss"

/**
  * @typedef {{
  *  className: *,
  *  children: *,
  *  info: {
  *    linkId: string
  *  },
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class KillerLink extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    children: PropTypes.node,
    info: PropTypes.object.isRequired,
  }

  render() {
    return <Link className={classnames(css.container, this.props.className)} to={`/killer/${this.props.info.linkId}`}>
      {this.props.children}
    </Link>
  }

}