import PropTypes from "prop-types"
import React from "react"

import AddOn from "lib/AddOn"
import ImagesOverlap from "src/components/ImagesOverlap"
import WithAddOnTooltip from "src/components/WithAddOnTooltip"

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
export default class AddOnImage extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    addOnId: PropTypes.string.isRequired,
    height: PropTypes.any,
    noTooltip: PropTypes.bool,
  }

  static defaultProps= {
    height: 256,
  }

  render() {
    const addOn = AddOn.find(this.props.addOnId)
    const iconSrc = require(`../../gameIcons/${addOn.id}.png`).default
    const backgroundSrc = require(`../../data/addOnBackgrounds/${addOn.rarity}.png`).default
    const imageElement = <ImagesOverlap alt={`${addOn.title} (Dead by Daylight Add-On)`} backgroundInput={backgroundSrc} {...this.props} foregroundInput={iconSrc}/>
    if (this.props.noTooltip) {
      return imageElement
    }
    return <WithAddOnTooltip addOnId={addOn.id}>{imageElement}</WithAddOnTooltip>
  }

}