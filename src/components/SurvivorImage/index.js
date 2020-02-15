import PropTypes from "prop-types"
import React from "react"
import Picture from "react-modern-picture"

import Survivor from "lib/Survivor"
import WithSurvivorTooltip from "components/WithSurvivorTooltip"

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
    noTooltip: PropTypes.bool,
  }

  render() {
    const survivor = Survivor.find(this.props.survivorId)
    const imgSrc = require(`../../data/survivors/${this.props.survivorId}/icon.png`).default
    const imageElement = <Picture alt={`${survivor.title} (Dead by Daylight Survivor)`} className={this.props.className} input={imgSrc}/>
    if (this.props.noTooltip) {
      return imageElement
    }
    return <WithSurvivorTooltip survivorId={survivor.id}>{imageElement}</WithSurvivorTooltip>
  }

}