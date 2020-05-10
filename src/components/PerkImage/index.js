import PropTypes from "prop-types"
import React from "react"

import findObject from "lib/findObject"
import ImagesOverlap from "src/components/ImagesOverlap"
import WithPerkTooltip from "src/components/WithPerkTooltip"

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
   perkId: PropTypes.string.isRequired,
   height: PropTypes.any,
   noTooltip: PropTypes.bool,
 }

  static defaultProps= {
    height: 256,
  }

  render() {
    const perk = findObject(this.props.perkId)
    const iconSrc = require(`../../gameIcons/${perk.id}.png`).default
    const backgroundSrc = require(`../../data/perkBackgrounds/${perk.rarity}.png`).default
    const imageElement = <ImagesOverlap alt={`${perk.title} (Dead by Daylight Perk)`} backgroundInput={backgroundSrc} {...this.props} foregroundInput={iconSrc}/>
    if (this.props.noTooltip) {
      return imageElement
    }
    return <WithPerkTooltip perkId={perk.id}>{imageElement}</WithPerkTooltip>
  }

}