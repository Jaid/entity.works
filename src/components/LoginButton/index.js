import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import Modal from "react-responsive-modal"
import {Tab, TabList, TabPanel, Tabs} from "react-tabs"

import loginManager from "lib/loginManager"
import LoginForm from "components/LoginForm"
import RegisterForm from "components/RegisterForm"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class LoginButton extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
  }

  state = {
    modalOpen: false,
  }

  openModal() {
    this.setState({
      modalOpen: true,
    })
  }

  handleCloseModal() {
    this.setState({
      modalOpen: false,
    })
  }

  render() {
    return <span>
      <a className={css.loginButton} onClick={this.openModal.bind(this)}>Login</a>
      <Modal classNames={{...css}} open={this.state.modalOpen} closeOnOverlayClick onClose={this.handleCloseModal.bind(this)}>
        <Tabs selectedTabClassName={css.selectedTab}>
          <TabList className={css.tabList}>
            <Tab>Login</Tab>
            <Tab>Register</Tab>
          </TabList>
          <TabPanel>
            <LoginForm onSubmit={loginManager.dispatchLogin.bind(loginManager)}/>
          </TabPanel>
          <TabPanel>
            <RegisterForm onSubmit={loginManager.dispatchRegister.bind(loginManager)}/>
          </TabPanel>
        </Tabs>
      </Modal>
    </span>
  }

}