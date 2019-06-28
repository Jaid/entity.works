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

import description from "./description.txt"
import css from "./style.scss"

const links = [
  {
    text: `${patches.length} Patches`,
    to: patchesLink,
  },
  {
    text: `${perks.length} Perks`,
    to: perksLink,
  },
  {
    text: `${killers.length} Killers`,
    to: killersLink,
  },
  {
    text: `${survivors.length} Survivors`,
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