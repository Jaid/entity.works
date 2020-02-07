import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import {Link} from "react-router-dom"

import findObject from "lib/findObject"

import css from "./style.scss"

/**
  * @typedef {{
  *  className: *,
  *  offeringId: string,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class OfferingLink extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    children: PropTypes.node,
    offeringId: PropTypes.string.isRequired,
  }

  render() {
    const offering = findObject(this.props.offeringId)
    return <Link className={classnames(css.container, this.props.className)} to={`/add-on/${offering.linkId}`}>
      {this.props.children}
    </Link>
  }

}