import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import Picture from "react-modern-picture"

import survivors from "lib/survivors"
import SurvivorLink from "components/SurvivorLink"
import SurvivorTooltip from "components/SurvivorTooltip"
import Tooltip from "components/Tooltip"

import css from "./style.scss"

export default class SurvivorBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    survivor: PropTypes.string.isRequired,
    large: PropTypes.bool,
    inline: PropTypes.bool,
  }

  static defaultProps = {
    large: false,
    inline: true,
  }

  render() {
    const imgSrc = require(`../../data/survivors/${this.props.survivor}/icon.png`).default
    const info = survivors.find(({id}) => id === this.props.survivor)
    const content = <span className={classnames(css.container, this.props.className, {
      [css.large]: this.props.large,
      [css.inline]: this.props.inline,
    })}>
      <Picture className={css.icon} input={imgSrc}/>
      <SurvivorLink info={info}>{info.shortTitle}</SurvivorLink>
    </span>
    return <Tooltip html={<SurvivorTooltip info={info}/>} noPadding>{content}</Tooltip>
  }

}