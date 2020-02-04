import PropTypes from "prop-types"
import React from "react"

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
   powerId: PropTypes.string.isRequired,
   height: PropTypes.any,
 }

  static defaultProps= {
    height: 256,
  }

  render() {
    const iconSrc = require(`../../gameIcons/${this.props.powerId}.png`).default
    const backgroundSrc = require("../../data/addOnBackgrounds/common.png").default
    return <ImagesOverlap backgroundInput={backgroundSrc} {...this.props} foregroundInput={iconSrc}/>
  }

}