import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import icon from "root/icon.png"
import {Link} from "react-router-dom"
import {killersLink, survivorsLink, patchesLink, perksLink} from "lib/links"
import SearchBar from "components/SearchBar"

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
      <img className={css.icon} src={icon}/>
      <Link className={css.title} to="/"><span className={css.entity}>Entity</span><span className={css.works}>Works</span></Link>
      <nav className={css.nav}>
        <Link to={patchesLink}>Patches</Link>
        <Link to={perksLink}>Perks</Link>
        <Link to={killersLink}>Killers</Link>
        <Link to={survivorsLink}>Survivors</Link>
        <SearchBar/>
      </nav>
    </div>
  }

}