import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import Picture from "react-modern-picture"
import {connect} from "react-redux"
import {Link} from "react-router-dom"

import {charactersLink} from "lib/links"
import LoginButton from "components/LoginButton"
import SearchBar from "components/SearchBar"

import icon from "root/icon.png"

import css from "./style.scss"

/**
  * @typedef {{
  *  className: *
  * }} Props
  */

@connect(({socket, login}) => ({
  login,
  socketStatus: socket.status,
}))

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
    socketStatus: PropTypes.string,
    login: PropTypes.object.isRequired,
  }

  getLoginButton() {
    if (this.props.socketStatus !== "connected") {
      return null
    }
    if (this.props.login.loggedIn) {
      return <Link to={`/user/${this.props.login.name}`}>{this.props.login.title}</Link>
    }
    return <LoginButton/>
  }

  render() {
    return <div className={classnames(css.container, this.props.className)}>
      <Picture className={css.icon} input={icon}/>
      <Link className={css.title} to="/"><span className={css.entity}>Entity</span><span className={css.works}>Works</span></Link>
      <nav className={css.nav}>
        <Link to="/build">Build</Link>
        <Link to={charactersLink}>Characters</Link>
        {this.getLoginButton()}
        <SearchBar/>
      </nav>
    </div>
  }

}