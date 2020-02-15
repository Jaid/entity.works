import PropTypes from "prop-types"
import React from "react"
import Picture from "react-modern-picture"

import Killer from "lib/Killer"
import WithKillerTooltip from "components/WithKillerTooltip"

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
    noTooltip: PropTypes.bool,
  }

  render() {
    const killer = Killer.find(this.props.killerId)
    const imgSrc = require(`../../data/killers/${this.props.killerId}/icon.png`).default
    const imageElement = <Picture alt={`${killer.title} (Dead by Daylight Killer)`} className={this.props.className} input={imgSrc}/>
    if (this.props.noTooltip) {
      return imageElement
    }
    return <WithKillerTooltip killerId={killer.id}>{imageElement}</WithKillerTooltip>
  }

}