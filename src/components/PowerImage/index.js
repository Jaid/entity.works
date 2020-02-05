import PropTypes from "prop-types"
import React from "react"

import Killer from "lib/Killer"
import ImagesOverlap from "components/ImagesOverlap"

/**
  * @typedef {{
  *   className: *,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class PerkImage extends React.Component {

 static propTypes = {
   className: PropTypes.oneOfType([
     PropTypes.string,
     PropTypes.object,
     PropTypes.arrayOf(PropTypes.string),
     PropTypes.arrayOf(PropTypes.object),
   ]),
   killerId: PropTypes.string.isRequired,
   height: PropTypes.any,
 }

  static defaultProps= {
    height: 256,
  }

  render() {
    const killer = Killer.find(this.props.killerId)
    const iconSrc = require(`../../gameIcons/${killer.powerId}.png`).default
    const backgroundSrc = require("../../data/addOnBackgrounds/common.png").default
    return <ImagesOverlap alt={`${killer.powerTitle} (Dead by Daylight ${killer.shortTitle} Power)`} backgroundInput={backgroundSrc} {...this.props} foregroundInput={iconSrc}/>
  }

}