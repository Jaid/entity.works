import PropTypes from "prop-types"
import React from "react"
import Picture from "react-modern-picture"

import Survivor from "lib/Survivor"

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
export default class SurvivorImage extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    survivorId: PropTypes.string.isRequired,
  }

  render() {
    const survivor = Survivor.find(this.props.survivorId)
    const imgSrc = require(`../../data/survivors/${this.props.survivorId}/icon.png`).default
    return <Picture alt={`${survivor.title} (Dead by Daylight Survivor)`} className={this.props.className} input={imgSrc}/>
  }

}