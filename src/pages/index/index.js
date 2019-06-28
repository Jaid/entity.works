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
      <Headline miniText={_PKG_TITLE} theme="green"><RichText>{description}</RichText></Headline>      <br/>
      <br/>
      <Link to={patchesLink}>{patches.length} Patches</Link>
      <br/>
      <Link to={perksLink}>{perks.length} Perks</Link>
      <br/>
      <Link to={killersLink}>{killers.length} Killers</Link>
      <br/>
      <Link to={survivorsLink}>{survivors.length} Survivors</Link>
    </main>
  }

}