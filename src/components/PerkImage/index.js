import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import findObject from "lib/findObject"

import css from "./style.scss"

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
  }

  render() {
    const perk = findObject(this.props.perkId)
    const imgSrc = require(`../../data/perks/${perk.id}/icon.png`).default
    const backgroundSrc = require(`../../data/perkBackgrounds/${perk.rarity}.png`).default
    return <img className={classnames(css.element, this.props.className)}
      src={imgSrc}
      style={{
        backgroundImage: `url(${backgroundSrc})`,
      }}/>
  }

}