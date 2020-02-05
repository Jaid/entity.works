import PropTypes from "prop-types"
import React from "react"

import AddOn from "lib/AddOn"
import ImagesOverlap from "components/ImagesOverlap"

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
  }

  static defaultProps= {
    height: 256,
  }

  render() {
    const addOn = AddOn.find(this.props.addOnId)
    const iconSrc = require(`../../gameIcons/${addOn.id}.png`).default
    const backgroundSrc = require(`../../data/addOnBackgrounds/${addOn.rarity}.png`).default
    return <ImagesOverlap alt={`${addOn.title} (Dead by Daylight Add-On)`} backgroundInput={backgroundSrc} {...this.props} foregroundInput={iconSrc}/>
  }

}