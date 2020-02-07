import PropTypes from "prop-types"
import React from "react"

import Offering from "lib/Offering"
import ImagesOverlap from "components/ImagesOverlap"

/**
  * @typedef {{
  *   className: *,
  *   offeringId: string,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class OfferingImage extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    offeringId: PropTypes.string.isRequired,
    height: PropTypes.any,
  }

  static defaultProps= {
    height: 256,
  }

  render() {
    const offering = Offering.find(this.props.offeringId)
    const iconSrc = require(`../../gameIcons/${offering.id}.png`).default
    const backgroundSrc = require(`../../data/offeringBackgrounds/${offering.rarity}.png`).default
    return <ImagesOverlap alt={`${offering.title} (Dead by Daylight Offering)`} backgroundInput={backgroundSrc} {...this.props} foregroundInput={iconSrc}/>
  }

}