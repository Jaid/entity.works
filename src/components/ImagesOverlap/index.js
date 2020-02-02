import classnames from "classnames"
import PropTypes from "prop-types"
import pxByDefault from "px-by-default"
import React from "react"
import Picture from "react-modern-picture"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   foregroundInput: *,
  *   backgroundInput: *,
  *   height: *
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class ImagesOverlap extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    foregroundInput: PropTypes.any.isRequired,
    backgroundInput: PropTypes.any.isRequired,
    height: PropTypes.any,
  }

  render() {
    const sizeProps = {}
    if (this.props.height) {
      sizeProps.style = {
        height: pxByDefault(this.props.height),
      }
    }
    return <span className={classnames(css.container, this.props.className)}>
      <Picture className={css.backgroundImage} input={this.props.backgroundInput} {...sizeProps}/>
      <Picture className={css.foregroundImage} input={this.props.foregroundInput} {...sizeProps}/>
    </span>
  }

}