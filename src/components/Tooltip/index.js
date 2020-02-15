import "tippy.js/animations/perspective.css"

import Tippy from "@tippy.js/react"
import classnames from "classnames"
import {isNumber} from "lodash"
import PropTypes from "prop-types"
import React from "react"

import css from "./style.scss"

/**
  * @typedef {{
  *  className: *,
  *  noPadding: boolean,
  *  html: *,
  *  minWidth: string,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class Tooltip extends React.Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    html: PropTypes.node.isRequired,
    noPadding: PropTypes.bool,
    minWidth: PropTypes.number,
  }

  static defaultProps = {
    noPadding: false,
    minWidth: null,
  }

  state = {
    shouldRender: false,
  }

  getContent() {
    if (!this.state.shouldRender) {
      return ""
    }
    /**
     * @type {import("react").CSSProperties}
     */
    const style = {
    }
    if (this.props.minWidth) {
      style.minWidth = isNumber(this.props.minWidth) ? `${this.props.minWidth}px` : this.props.minWidth
    }
    return <div className={classnames(css.container, {[css.noPadding]: this.props.noPadding}, this.props.className)} style={style}>
      {this.props.html}
    </div>
  }

  startRender() {
    this.setState({
      shouldRender: true,
    })
  }

  render() {
    return <Tippy animation="perspective" content={this.getContent()} distance={24} theme="entity" inertia interactive onShow={this.startRender.bind(this)}>
      <span>{this.props.children}</span>
    </Tippy>
  }

}