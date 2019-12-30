import "tippy.js/animations/perspective.css"

import Tippy from "@tippy.js/react"
import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import css from "./style.scss"

/**
  * @typedef {{
  *  className: *,
  *  noPadding: boolean,
  *  html: *,
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
  }

  static defaultProps = {
    noPadding: false,
  }

  render() {
    const tooltipContent = <div className={classnames(css.container, {[css.noPadding]: this.props.noPadding}, this.props.className)}>
      {this.props.html}
    </div>
    return <Tippy animation="perspective" content={tooltipContent} delay={100} distance={24} theme="entity" touch={false} inertia interactive>
      <span>{this.props.children}</span>
    </Tippy>
  }

}