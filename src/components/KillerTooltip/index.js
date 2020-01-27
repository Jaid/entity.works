import classnames from "classnames"
import {sortBy} from "lodash"
import PropTypes from "prop-types"
import React from "react"
import Picture from "react-modern-picture"

import Perk from "lib/Perk"
import PerkBox from "components/PerkBox"

import css from "./style.scss"

export default class KillerTooltip extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    info: PropTypes.object.isRequired,
  }

  render() {
    const ownPerks = Perk.findByOwner(this.props.info.id)
    const imgSrc = require(`../../data/killers/${this.props.info.id}/icon.png`).default
    return <div className={classnames(css.container, this.props.className)}>
      <Picture className={css.banner} input={imgSrc}/>
      <div className={css.title}>{this.props.info.shortTitle}</div>
      <div className={css.content}>
        {ownPerks.map(perk => <div key={perk.level} className={css.perk}><PerkBox perk={perk.id}/></div>)}
      </div>
    </div>
  }

}