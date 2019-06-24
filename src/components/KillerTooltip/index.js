import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import perks from "lib/perks"
import {sortBy} from "lodash"
import PerkBox from "components/PerkBox"

import css from "./style.scss"

export default class KillerTooltip extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    info: PropTypes.object.isRequired,
  }

  render() {
    const ownPerks = perks
      |> #.filter(({owner}) => owner === this.props.info.id)
    const orderedPerks = sortBy(ownPerks, "level")
    return <div className={classnames(css.container, this.props.className)}>
      <img className={css.banner} src={require(`../../data/killers/${this.props.info.id}/icon.png`)}/>
      <div className={css.title}>{this.props.info.shortTitle}</div>
      <div className={css.content}>
        {orderedPerks.map(perk => <div key={perk.level} className={css.perk}><PerkBox perk={perk.id}/></div>)}
      </div>
    </div>
  }

}