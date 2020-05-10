import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import findObject from "lib/findObject"
import Perk from "lib/Perk"
import KillerImage from "src/components/KillerImage"
import PerkBox from "src/components/PerkBox"
import PowerBox from "src/components/PowerBox"
import Tooltip from "src/components/Tooltip"

import css from "./style.scss"

export default class WithKillerTooltip extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    killerId: PropTypes.string.isRequired,
    children: PropTypes.node,
  }

  getContent() {
    const killer = findObject(this.props.killerId)
    const ownPerks = Perk.findByOwner(killer.id)
    return <div className={classnames(css.container, this.props.className)}>
      <KillerImage className={css.banner} killerId={killer.id} noTooltip/>
      <div className={css.title}>{killer.shortTitle}</div>
      <div className={css.content}>
        <PowerBox killerId={killer.id}/>
        {ownPerks.map(perk => <div key={perk.level} className={css.perk}><PerkBox perkId={perk.id}/></div>)}
      </div>
    </div>
  }

  render() {
    return <Tooltip html={this.getContent()} noPadding>
      {this.props.children}
    </Tooltip>
  }

}