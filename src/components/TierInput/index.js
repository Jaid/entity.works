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
export default class TierInput extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    input: PropTypes.object.isRequired,
  }

  state = {
    value: this.props.input.value || "unrated",
  }

  handleChange(value) {
    this.setState({value})
    this.props.input.onChange(value)
  }

  render() {
    const inputTiers = {
      ...tiers,
      unrated: {
        title: "Unrated",
      },
    }
    const elements = Object.entries(inputTiers).map(([tierId, tier]) => {
      const className = classnames(css.button, css[`${tierId}Button`], {[css.selected]: this.state.value === tierId})
      return <span key={tierId} className={className} onClick={() => this.handleChange(tierId)}>{tier.title}</span>
    })
    return <div className={classnames(css.container, this.props.className)}>
      {elements}
    </div>
  }

}