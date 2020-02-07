import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import Picture from "react-modern-picture"

import Perk from "lib/Perk"
import css from "components/KillerTooltip/style.scss"
import PerkBox from "components/PerkBox"

export default class SurvivorTooltip extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    info: PropTypes.object.isRequired,
  }

  render() {
    const ownPerks = Perk.findByOwner(this.props.info.id)
    const imgSrc = require(`../../data/survivors/${this.props.info.id}/icon.png`).default
    return <div className={classnames(css.container, this.props.className)}>
      <Picture className={css.banner} input={imgSrc}/>
      <div className={css.title}>{this.props.info.shortTitle}</div>
      <div className={css.content}>
        {ownPerks.map(perk => <div key={perk.level} className={css.perk}><PerkBox perkId={perk.id}/></div>)}
      </div>
    </div>
  }

}