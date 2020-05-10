import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import findObject from "lib/findObject"
import OfferingImage from "src/components/OfferingImage"
import OfferingLink from "src/components/OfferingLink"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   offeringId: string,
  *   imageHeight: string
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class OfferingBox extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    imageHeight: PropTypes.string,
    offeringId: PropTypes.string.isRequired,
  }

  static defaultProps = {
    imageHeight: "2em",
  }

  render() {
    const offering = findObject(this.props.offeringId)
    return <span className={classnames()}>
      <OfferingImage height={this.props.imageHeight} offeringId={this.props.offeringId}/><OfferingLink offeringId={this.props.offeringId}>{offering.title}</OfferingLink>
    </span>
  }

}