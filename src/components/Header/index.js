import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import {slide as BurgerMenu} from "react-burger-menu"
import Picture from "react-modern-picture"
import {connect} from "react-redux"
import {Link} from "react-router-dom"

import {charactersLink} from "lib/links"
import loginManager, {LogoutLink, ProfileLink} from "lib/loginManager"
import appCss from "components/App/style.scss"
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
      return null
    }
    return <LoginButton/>
  }

  getDesktopNavigation() {
    return <nav className={css.navBar}>
      <Link to="/build">Build</Link>
      <Link to={charactersLink}>Characters</Link>
      <ProfileLink/>
      <LogoutLink/>
      {this.getLoginButton()}
      <SearchBar/>
    </nav>

  }

  getMobileNavigation() {
    return <BurgerMenu burgerBarClassName={css.burgerBar} burgerButtonClassName={css.burgerButton} crossButtonClassName={css.burgerCross} crossClassName={css.burgerCrossIcon} itemListClassName={css.burgerItemList} menuClassName={css.burgerBody} outerContainerId={css.container} pageWrapId={appCss.containerWithId} disableAutoFocus right>
      <Link to="/build">Build</Link>
      <Link to={charactersLink}>Characters</Link>
      <ProfileLink/>
      <LogoutLink/>
      {this.getLoginButton()}
      <SearchBar/>
    </BurgerMenu>
  }

  render() {
    return <div className={classnames(this.props.className)} id={css.container}>
      <div className={css.titleBox}>
        <Picture className={css.icon} input={icon}/>
        <Link className={css.title} to="/"><span className={css.entity}>Entity</span><span className={css.works}>Works</span></Link>
      </div>
      {this.getDesktopNavigation()}
      {this.getMobileNavigation()}
    </div>
  }

}