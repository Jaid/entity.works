import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import {Link} from "react-router-dom"
import patches from "lib/patches"
import RichText from "components/RichText"
import killers from "lib/killers"
import survivors from "lib/survivors"
import {killerPerks, survivorPerks} from "lib/perks"
import Headline from "components/Headline"
import {killersLink, survivorsLink, patchesLink, survivorPerksLink, killerPerksLink} from "lib/links"

import description from "./description.txt"
import css from "./style.scss"

const links = [
  {
    count: killers.length,
    text: "Killers",
    to: killersLink,
  },
  {
    count: killerPerks.length,
    text: "Killer Perks",
    to: killerPerksLink,
  },
  {
    count: survivorPerks.length,
    text: "Survivor Perks",
    to: survivorPerksLink,
  },
  {
    count: survivors.length,
    text: "Survivors",
    to: survivorsLink,
  },
  {
    count: patches.length,
    text: "Patches",
    to: patchesLink,
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
    const linkBoxes = links.map(({count, text, to}) => <Link key={to} className={css.linkBox} to={to}>
      <div className={css.linkBoxCount}>{count}</div>
      <div className={css.linkBoxText}>{text}</div>
    </Link>)
    return <main className={classnames(css.container, this.props.className)}>
      <Headline miniText={_PKG_TITLE} theme="green"><RichText>{description}</RichText></Headline>
      <nav className={css.linkList}>
        {linkBoxes}
      </nav>
    </main>
  }

}