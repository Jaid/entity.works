import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import Tippy from "@tippy.js/react"

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
    const tooltipContent = <div className={classnames(css.container, {[css.noPadding]: this.props.noPadding}, this.props.className)}>{this.props.html}</div>
    return <Tippy animateFill={false} animation="perspective" arrowType="sharp" content={tooltipContent} distance={16} interactiveBorder={2} theme="entity" arrow inertia interactive>
      <span>{this.props.children}</span>
    </Tippy>
  }

}