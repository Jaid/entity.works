import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import {findPerk} from "lib/findObject"
import PerkImage from "components/PerkImage"
import PerkLink from "components/PerkLink"
import PerkTooltip from "components/PerkTooltip"
import Tooltip from "components/Tooltip"

import css from "./style.scss"

export default class PerkBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    imageClassName: PropTypes.string,
    perk: PropTypes.string.isRequired,
    large: PropTypes.bool,
    inline: PropTypes.bool,
  }

  static defaultProps = {
    large: false,
    inline: true,
  }

  render() {
    const perk = findPerk(this.props.perk)
    const text = <span className={classnames(css.container, this.props.className, {
      [css.large]: this.props.large,
      [css.inline]: this.props.inline,
    })}>
      <PerkImage className={classnames(css.icon, this.props.imageClassName)} height="2.5em" perkId={perk.id}/>
      <PerkLink perkInfo={perk}/>
    </span>
    return <Tooltip html={<PerkTooltip perkId={perk.id}/>} minWidth={300} noPadding>
      {text}
    </Tooltip>
  }

}