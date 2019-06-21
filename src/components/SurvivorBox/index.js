import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import survivors from "lib/survivors"

import css from "./style.scss"

export default class SurvivorBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    survivor: PropTypes.string.isRequired,
    large: PropTypes.bool,
  }

  static defaultProps = {
    large: false,
  }

  render() {
    const info = survivors.find(({id}) => id === this.props.survivor)
    return <span className={classnames(css.container, this.props.className, css[this.props.large ? "large" : "inline"])}>
      <img className={css.icon} src={require(`../../data/survivors/${this.props.survivor}/icon.png`)}/>
      {info.title}
    </span>
  }

}