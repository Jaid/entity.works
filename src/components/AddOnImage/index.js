import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import Picture from "react-modern-picture"

import AddOn from "lib/AddOn"

import css from "./style.scss"

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
  }

  render() {
    const addOn = AddOn.find(this.props.addOnId)
    const iconSrc = require(`../../gameIcons/${addOn.id}.png`).default
    const backgroundSrc = require("../../data/perkBackgrounds/veryRare.png").default
    return <div className={classnames(css.container, this.props.className)}>
      <Picture className={css.backgroundImage} input={backgroundSrc}/>
      <Picture className={css.iconImage} input={iconSrc}/>
    </div>
  }

}