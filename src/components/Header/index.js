import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import Picture from "react-modern-picture"
import {Link} from "react-router-dom"

import {charactersLink, patchesLink, survivorPerksLink} from "lib/links"
import SearchBar from "components/SearchBar"

import icon from "root/icon.png"

import css from "./style.scss"

/**
  * @typedef {{
  *  className: *
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class Header extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
  }

  render() {
    return <div className={classnames(css.container, this.props.className)}>
      <Picture className={css.icon} input={icon}/>
      <Link className={css.title} to="/"><span className={css.entity}>Entity</span><span className={css.works}>Works</span></Link>
      <nav className={css.nav}>
        <Link to="/build">Build</Link>
        <Link to={charactersLink}>Characters</Link>
        <Link to={survivorPerksLink}>Perks</Link>
        <Link to={patchesLink}>Patches</Link>
        <SearchBar/>
      </nav>
    </div>
  }

}