import PropTypes from "prop-types"
import React from "react"

import Item from "lib/Item"
import ImagesOverlap from "src/components/ImagesOverlap"
import WithItemTooltip from "src/components/WithItemTooltip"

/**
  * @typedef {{
  *   className: *,
  *   itemId: string,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class ItemImage extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    itemId: PropTypes.string.isRequired,
    height: PropTypes.any,
    noTooltip: PropTypes.bool,
  }

  static defaultProps= {
    height: 256,
  }

  render() {
    const item = Item.find(this.props.itemId)
    const iconSrc = require(`../../gameIcons/${item.id}.png`).default
    const backgroundSrc = require(`../../data/addOnBackgrounds/${item.rarity}.png`).default
    const imageElement = <ImagesOverlap alt={`${item.title} (Dead by Daylight Item)`} backgroundInput={backgroundSrc} {...this.props} foregroundInput={iconSrc}/>
    if (this.props.noTooltip) {
      return imageElement
    }
    return <WithItemTooltip itemId={item.id}>{imageElement}</WithItemTooltip>
  }

}