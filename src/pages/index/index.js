import moment from "moment"
import positionInRange from "position-in-range"
import PropTypes from "prop-types"
import React from "react"
import {Link} from "react-router-dom"

import Item from "lib/Item"
import Killer from "lib/Killer"
import {killerPerksLink, killersLink, patchesLink, survivorPerksLink, survivorsLink} from "lib/links"
import Offering from "lib/Offering"
import Patch from "lib/Patch"
import Perk from "lib/Perk"
import Survivor from "lib/Survivor"
import Headline from "components/Headline"
import RichText from "components/RichText"

import description from "./description.txt"
import css from "./style.scss"

const links = [
  {
    count: Patch.all.length,
    text: "Patches",
    to: patchesLink,
  },
  {
    count: Killer.allVisible.length,
    text: "Killers",
    to: killersLink,
  },
  {
    count: Perk.forKiller.length,
    text: "Killer Perks",
    to: killerPerksLink,
  },
  {
    count: Perk.forSurvivor.length,
    text: "Survivor Perks",
    to: survivorPerksLink,
  },
  {
    count: Survivor.allVisible.length,
    text: "Survivors",
    to: survivorsLink,
  },
  {
    count: Item.allVisible.length,
    text: "Items",
    to: "/items/toolbox",
  },
  {
    count: Offering.forKiller.length,
    text: "Killer Offerings",
    to: "/offerings/killer",
  },
  {
    count: Offering.forSurvivor.length,
    text: "Survivor Offerings",
    to: "/offerings/survivor",
  },
]

/**
  * @typedef {{
  *  className: *
  *  match: {
  *    isExact: boolean
  *    path: string
  *    url: string
  *    params: Object.<string, string>
  *  }
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class IndexPage extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    match: PropTypes.exact({
      isExact: PropTypes.bool.isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      params: PropTypes.object,
    }).isRequired,
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
    const linkBoxes = links.map(({count, text, to}) => <Link key={to} className={css.linkBox} to={to}>
      <div className={css.linkBoxCount}>{count}</div>
      <div className={css.linkBoxText}>{text}</div>
    </Link>)
    return <main>
      <Headline miniText={_PKG_TITLE} theme="green"><RichText>{description}</RichText></Headline>
      <nav className={css.linkList}>
        {linkBoxes}
      </nav>
      <div className={css.rankSeasonProgressBar}
        style={{
          background: `linear-gradient(to right, #6dff6d44 0%, #6dff6d44 ${rankSeasonProgress - 0.5}%, transparent ${rankSeasonProgress + 0.5}%, transparent 100%)`,
        }}>
        <span>{previousRankResetMoment.format("MMMM")} 13</span>
        <span>Rank reset {nextRankResetMoment.fromNow()}</span>
        <span>{nextRankResetMoment.format("MMMM")} 13</span>
      </div>
    </main>
  }

}