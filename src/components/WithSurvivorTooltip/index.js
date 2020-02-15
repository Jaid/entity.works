import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import findObject from "lib/findObject"
import Perk from "lib/Perk"
import PerkBox from "components/PerkBox"
import SurvivorImage from "components/SurvivorImage"
import Tooltip from "components/Tooltip"
import css from "components/WithKillerTooltip/style.scss"

export default class WithSurvivorTooltip extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    survivorId: PropTypes.string.isRequired,
    children: PropTypes.node,
  }

  getContent() {
    const survivor = findObject(this.props.survivorId)
    const ownPerks = Perk.findByOwner(survivor.id)
    return <div className={classnames(css.container, this.props.className)}>
      <SurvivorImage className={css.banner} survivorId={survivor.id} noTooltip/>
      <div className={css.title}>{survivor.shortTitle}</div>
      <div className={css.content}>
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