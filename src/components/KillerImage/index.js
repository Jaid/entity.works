import PropTypes from "prop-types"
import React from "react"
import Picture from "react-modern-picture"

import Killer from "lib/Killer"

/**
  * @typedef {{
  *   className: *,
  *   addOnId: string,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class KillerImage extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    killerId: PropTypes.string.isRequired,
  }

  render() {
    const killer = Killer.find(this.props.killerId)
    const imgSrc = require(`../../data/killers/${this.props.killerId}/icon.png`).default
    return <Picture alt={`${killer.title} (Dead by Daylight Killer)`} className={this.props.className} input={imgSrc}/>
  }

}