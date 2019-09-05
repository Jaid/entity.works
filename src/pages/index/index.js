import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import {Link} from "react-router-dom"
import patches from "lib/patches"
import RichText from "components/RichText"
import killers from "lib/killers"
import survivors from "lib/survivors"
import perks from "lib/perks"
import Headline from "components/Headline"
import {killersLink, survivorsLink, patchesLink, perksLink} from "lib/links"
import zahl from "zahl"

import description from "./description.txt"
import css from "./style.scss"

const links = [
  {
    text: zahl(patches, "Patch"),
    to: patchesLink,
  },
  {
    text: zahl(perks, "Perk"),
    to: perksLink,
  },
  {
    text: zahl(killers, "Killers"),
    to: killersLink,
  },
  {
    text: zahl(survivors, "Survivors"),
    to: survivorsLink,
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
    return <main className={classnames(css.container, this.props.className)}>
      <Headline miniText={_PKG_TITLE} theme="green"><RichText>{description}</RichText></Headline>
      <nav className={css.linkList}>
        {links.map(({text, to}) => <Link key={to} className={css.link} to={to}>{text}</Link>)}
      </nav>
    </main>
  }

}