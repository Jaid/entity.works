import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import tiers from "lib/tiers"

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
export default class TierBox extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    tierId: PropTypes.string.isRequired,
  }

  render() {
    const tier = tiers[this.props.tierId]
    return <span className={classnames(this.props.className, css[this.props.tierId])}>
      <span className={css.inner}>{tier.title}</span>
    </span>
  }

}