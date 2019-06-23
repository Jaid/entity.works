import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import {Tooltip as TippyTooltip} from "react-tippy"

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
class Tooltip extends React.Component {

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
    return <TippyTooltip animateFill={false} animation="perspective" distance={15} html={tooltipContent} interactiveBorder={8} theme="entity" arrow inertia interactive>
      {this.props.children}
    </TippyTooltip>
  }

}

export default Tooltip