import PropTypes from "prop-types"
import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"

import {charactersLink} from "lib/links"
import {LogoutLink, ProfileLink} from "lib/loginManager"
import DesktopHeader from "src/components/DesktopHeader"
import LoginButton from "src/components/LoginButton"
import MobileHeader from "src/components/MobileHeader"
import SearchBar from "src/components/SearchBar"

/**
  * @typedef {{
  *  className: *
  * }} Props
  */

@connect(({socket, login, responsive}) => ({
  login,
  socketStatus: socket.status,
  isMobile: responsive.is.mobile,
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
    isMobile: PropTypes.bool.isRequired,
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

  render() {
    const PickedHeader = this.props.isMobile ? MobileHeader : DesktopHeader
    return <PickedHeader>
      <Link to="/build">Build</Link>
      <Link to={charactersLink}>Characters</Link>
      <Link to="/about">About</Link>
      <ProfileLink/>
      <LogoutLink/>
      {this.getLoginButton()}
      <SearchBar/>
    </PickedHeader>
  }

}