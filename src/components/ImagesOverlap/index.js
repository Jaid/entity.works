import classnames from "classnames"
import {pick} from "lodash"
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
  *   height: *,
  *   alt: string
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
    style: PropTypes.any,
    alt: PropTypes.string,
  }

  render() {
    const passedProps = pick(this.props, ["alt"])
    if (this.props.height) {
      passedProps.style = {
        height: pxByDefault(this.props.height),
      }
    }
    return <span className={classnames(css.container, this.props.className)} style={this.props.style}>
      <Picture className={css.backgroundImage} input={this.props.backgroundInput} {...passedProps}/>
      <Picture className={css.foregroundImage} input={this.props.foregroundInput} {...passedProps}/>
    </span>
  }

}