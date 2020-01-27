import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import Picture from "react-modern-picture"

import Survivor from "lib/Survivor"
import SurvivorLink from "components/SurvivorLink"
import SurvivorTooltip from "components/SurvivorTooltip"
import Tooltip from "components/Tooltip"

import css from "./style.scss"

export default class SurvivorBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    imageClassName: PropTypes.string,
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
    const info = Survivor.find(this.props.survivor)
    const content = <span className={classnames(css.container, this.props.className, {
      [css.large]: this.props.large,
      [css.inline]: this.props.inline,
    })}>
      <Picture className={classnames(css.icon, this.props.imageClassName)} input={imgSrc}/>
      <SurvivorLink info={info}>{info.shortTitle}</SurvivorLink>
    </span>
    return <Tooltip html={<SurvivorTooltip info={info}/>} noPadding>{content}</Tooltip>
  }

}