import classnames from "classnames"
import {isEmpty} from "has-content"
import PropTypes from "prop-types"
import React from "react"

import collator from "lib/collator"
import Killer from "lib/Killer"
import tiers from "lib/tiers"
import KillerBox from "src/components/KillerBox"
import RichText from "src/components/RichText"
import TierBox from "src/components/TierBox"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  * }} Props
  */

function sortEntries([id1, info1], [id2, info2]) {
  const tiersKeys = Object.keys(tiers)
  const tierIndex1 = tiersKeys.indexOf(info1.tier)
  const tierIndex2 = tiersKeys.indexOf(info2.tier)
  const tierIndexDifference = tierIndex1 - tierIndex2
  if (tierIndexDifference === 0) {
    const killer1 = Killer.find(id1)
    const killer2 = Killer.find(id2)
    return collator.compare(killer1.title, killer2.title)
  }
  return tierIndexDifference
}

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class BuildKillerTierListContent extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    data: PropTypes.object,
  }

  getDescription() {
    if (!this.props.data.description) {
      return null
    }
    return <div className={css.description}>
      <RichText>{this.props.data.description}</RichText>
    </div>
  }

  getComment(comment) {
    if (isEmpty(comment)) {
      return null
    }
    return <div className={css.comment}>
      <RichText>{comment}</RichText>
    </div>
  }

  getTierEntries() {
    if (!this.props.data.tiers) {
      return null
    }
    const filteredEntries = Object.entries(this.props.data.tiers).filter(([killerId, killerInfo]) => {
      if (!killerInfo) {
        return false
      }
      if (!killerInfo.tier || killerInfo.tier === "unrated") {
        return false
      }
      return true
    })
    filteredEntries.sort(sortEntries)
    return filteredEntries.map(([killerId, killerInfo]) => {
      return <div key={killerId} className={css.entry}>
        <TierBox className={css.tierBox} tierId={killerInfo.tier}/>
        <div className={css.killerBlock}>
          <KillerBox className={css.killerBox} killer={killerId}/>
          {this.getComment(killerInfo.comment)}
        </div>
      </div>
    })
  }

  render() {
    if (!this.props.data) {
      return null
    }
    return <div className={classnames(css.container, this.props.className)}>
      {this.getDescription()}
      {this.getTierEntries()}
    </div>
  }

}