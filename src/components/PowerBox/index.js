import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import findObject from "lib/findObject"
import KillerLink from "src/components/KillerLink"
import PowerImage from "src/components/PowerImage"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   killerId: string,
  *   imageHeight: string
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class KillerBox extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    imageHeight: PropTypes.string,
    killerId: PropTypes.string.isRequired,
  }

  static defaultProps = {
    imageHeight: "2em",
  }

  render() {
    const killer = findObject(this.props.killerId)
    return <span className={classnames()}>
      <PowerImage height={this.props.imageHeight} killerId={this.props.killerId}/><KillerLink info={killer}>{killer.powerTitle}</KillerLink>
    </span>
  }

}