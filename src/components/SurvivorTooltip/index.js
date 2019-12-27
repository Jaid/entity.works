import classnames from "classnames"
import {sortBy} from "lodash"
import PropTypes from "prop-types"
import React from "react"

import perks from "lib/perks"
import css from "components/KillerTooltip/style.scss"
import PerkBox from "components/PerkBox"

export default class SurvivorTooltip extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    info: PropTypes.object.isRequired,
  }

  render() {
    const ownPerks = perks.filter(({owner}) => owner === this.props.info.id)
    const orderedPerks = sortBy(ownPerks, "level")
    const imgSrc = require(`../../data/survivors/${this.props.info.id}/icon.png`).default
    return <div className={classnames(css.container, this.props.className)}>
      <img className={css.banner} src={imgSrc}/>
      <div className={css.title}>{this.props.info.shortTitle}</div>
      <div className={css.content}>
        {orderedPerks.map(perk => <div key={perk.level} className={css.perk}><PerkBox perk={perk.id}/></div>)}
      </div>
    </div>
  }

}