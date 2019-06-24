import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import css from "./style.scss"

/**
  * @typedef {{
  *  className: *,
  *  tiers: string[]
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class TiersTooltip extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    tiers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  render() {
    return <div className={classnames(css.container, this.props.className)}>
      {this.props.tiers.join(" / ")}
    </div>
  }

}