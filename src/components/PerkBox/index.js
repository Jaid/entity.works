import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import perks from "lib/perks"
import PerkTooltip from "components/PerkTooltip"
import Tooltip from "components/Tooltip"

import css from "./style.scss"

export default class PerkBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    perk: PropTypes.string.isRequired,
    large: PropTypes.bool,
    tooltips: PropTypes.bool,
  }

  static defaultProps = {
    large: false,
    tooltips: false,
  }

  render() {
    const perkInfo = perks.find(({id}) => id === this.props.perk)
    const text = <span className={classnames(css.container, this.props.className, css[this.props.large ? "large" : "inline"])}>
      <img className={css.background} src={require(`../../data/perkBackgrounds/${perkInfo.rarity}.png`)}/>
      <img className={css.icon} src={require(`../../data/perks/${this.props.perk}/icon.png`)}/>
      {perkInfo.title}
    </span>
    if (this.props.tooltips || 1) {
      return <Tooltip html={<PerkTooltip info={perkInfo}/>}>{text}</Tooltip>
    } else {
      return text
    }
  }

}