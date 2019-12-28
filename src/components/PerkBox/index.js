import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import perks from "lib/perks"
import PerkLink from "components/PerkLink"
import PerkTooltip from "components/PerkTooltip"
import Tooltip from "components/Tooltip"

import css from "./style.scss"

export default class PerkBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    perk: PropTypes.string.isRequired,
    large: PropTypes.bool,
    inline: PropTypes.bool,
  }

  static defaultProps = {
    large: false,
    inline: true,
  }

  render() {
    const perkInfo = perks.find(({id}) => id === this.props.perk)
    const imgSrc = require(`../../data/perks/${this.props.perk}/icon.png`).default
    const backgroundSrc = require(`../../data/perkBackgrounds/${perkInfo.rarity}.png`).default
    const text = <span className={classnames(css.container, this.props.className, {
      [css.large]: this.props.large,
      [css.inline]: this.props.inline,
    })}>
      <img className={css.icon}
        src={imgSrc}
        style={{
          background: `url(${backgroundSrc})`,
          backgroundSize: "cover",
        }}/>
      <PerkLink perkInfo={perkInfo}/>
    </span>
    return <Tooltip html={<PerkTooltip perkId={perkInfo.id}/>} noPadding>
      {text}
    </Tooltip>
  }

}