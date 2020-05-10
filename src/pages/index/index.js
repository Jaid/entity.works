import PropTypes from "prop-types"
import React from "react"

import Item from "lib/Item"
import Killer from "lib/Killer"
import {killerPerksLink, killersLink, patchesLink, survivorPerksLink, survivorsLink} from "lib/links"
import Offering from "lib/Offering"
import Patch from "lib/Patch"
import Perk from "lib/Perk"
import Survivor from "lib/Survivor"
import ContentLinkList from "src/components/ContentLinkList"
import Headline from "src/components/Headline"
import RankSeasonProgressBar from "src/components/RankSeasonProgressBar"
import RichText from "src/components/RichText"
import SmallerTitle from "src/components/SmallerTitle"
import UserContentOverview from "src/components/UserContentOverview"

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
    to: "/items/firecracker",
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
    return <main>
      <Headline miniText={_PKG_TITLE} theme="green"><RichText>{description}</RichText></Headline>
      <SmallerTitle>Game Content</SmallerTitle>
      <RankSeasonProgressBar className={css.rankSeasonProgressBar}/>
      <nav className={css.linkList}>
        <ContentLinkList links={links}/>
      </nav>
      <UserContentOverview withTitle/>
    </main>
  }

}