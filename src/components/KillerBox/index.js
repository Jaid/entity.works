import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import Picture from "react-modern-picture"

import Killer from "lib/Killer"
import KillerLink from "components/KillerLink"
import KillerTooltip from "components/KillerTooltip"
import Tooltip from "components/Tooltip"

import css from "./style.scss"

export default class KillerBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    imageClassName: PropTypes.string,
    killer: PropTypes.string.isRequired,
    large: PropTypes.bool,
    inline: PropTypes.bool,
  }

  static defaultProps = {
    large: false,
    inline: true,
  }

  render() {
    const killer = Killer.find(this.props.killer)
    const imgSrc = require(`../../data/killers/${this.props.killer}/icon.png`).default
    const content = <span className={classnames(css.container, this.props.className, {
      [css.large]: this.props.large,
      [css.inline]: this.props.inline,
    })}>
      <Picture alt={`${killer.title} (Dead by Daylight Killer)`} className={classnames(css.icon, this.props.imageClassName)} input={imgSrc}/>
      <KillerLink info={killer}>{this.props.large ? killer.title : killer.shortTitle}</KillerLink>
    </span>
    return <Tooltip html={<KillerTooltip info={killer}/>} noPadding>{content}</Tooltip>
  }

}