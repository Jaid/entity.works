import classnames from "classnames"
import moment from "moment"
import positionInRange from "position-in-range"
import PropTypes from "prop-types"
import React from "react"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class RankSeasonProgressBar extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
  }

  render() {
    const nowMoment = moment()
    const thisMonth13Moment = moment().utcOffset(-4).set({
      date: 13,
      hour: 8,
      minute: 0,
      second: 0,
      millisecond: 0,
    })
    const isRankResetThisMonth = nowMoment.isBefore(thisMonth13Moment)
    const nextRankResetMoment = moment(isRankResetThisMonth ? thisMonth13Moment : thisMonth13Moment.add(1, "month"))
    const previousRankResetMoment = moment(nextRankResetMoment).subtract(1, "month")
    const rankSeasonProgress = positionInRange(Number(previousRankResetMoment), Number(nextRankResetMoment), Number(nowMoment)) * 100
    return <div className={classnames(this.props.className, css.container)}
      style={{
        background: `linear-gradient(to right, #6dff6d44 0%, #6dff6d44 ${rankSeasonProgress - 0.5}%, transparent ${rankSeasonProgress + 0.5}%, transparent 100%)`,
      }}>
      <span>{previousRankResetMoment.format("MMMM")} 13</span>
      <span>Rank reset {nextRankResetMoment.fromNow()}</span>
      <span>{nextRankResetMoment.format("MMMM")} 13</span>
    </div>

  }

}