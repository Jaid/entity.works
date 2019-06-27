import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import survivors from "lib/survivors"
import SurvivorTooltip from "components/SurvivorTooltip"
import Tooltip from "components/Tooltip"

import css from "./style.scss"

export default class SurvivorBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    survivor: PropTypes.string.isRequired,
    large: PropTypes.bool,
    tooltips: PropTypes.bool,
  }

  static defaultProps = {
    large: false,
    tooltips: false,
  }

  render() {
    const info = survivors.find(({id}) => id === this.props.survivor)
    const content = <span className={classnames(css.container, this.props.className, css[this.props.large ? "large" : "inline"])}>
      <img className={css.icon} src={require(`../../data/survivors/${this.props.survivor}/icon.png`)}/>
      {info.title}
    </span>
    if (this.props.tooltips) {
      return <Tooltip html={<SurvivorTooltip info={info}/>} noPadding>{content}</Tooltip>
    } else {
      return content
    }
  }

}