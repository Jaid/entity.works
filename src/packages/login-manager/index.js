import emitPromise from "emit-promise"
import immer from "immer"
import jsCookie from "js-cookie"
import PropTypes from "prop-types"
import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"

export default class LoginManager {

  constructor(options) {
    this.options = {
      actionTypePrefix: "@@login/",
      socketClient: null,
      cookieName: "login",
      profileLinkPrefix: "/user/",
      ...options,
    }
    this.login = jsCookie.getJSON(this.options.cookieName)
  }

  getProfileLinkComponent() {
    const profileLinkPrefix = this.options.profileLinkPrefix
    class ProfileLink extends React.Component {
      static displayName = "loginManager.ProfileLink"

      static propTypes = {
        socketStatus: PropTypes.string,
        login: PropTypes.object.isRequired,
      }

      render() {
        if (!this.props.login.loggedIn) {
          return null
        }
        const link = `${profileLinkPrefix}${this.props.login.name}`
        return <Link to={link}>{this.props.login.title}</Link>
      }
    }
    return connect(({socket, login}) => ({
      login,
      socketStatus: socket.status,
    }))(ProfileLink)
  }

  getLogoutLinkComponent() {
    const logoutAction = {
      type: this.createActionType("logout"),
    }
    class LogoutLink extends React.Component {
      static displayName = "loginManager.LogoutLink"

      static propTypes = {
        socketStatus: PropTypes.string,
        loggedIn: PropTypes.bool,
        dispatch: PropTypes.func.isRequired,
      }

      render() {
        if (!this.props.loggedIn) {
          return null
        }
        return <a style={{cursor: "pointer"}}
          onClick={() => {
            this.props.dispatch(logoutAction)
          }}>Logout</a>
      }
    }
    return connect(({socket, login}) => ({
      loggedIn: login?.loggedIn,
      socketStatus: socket.status,
    }))(LogoutLink)
  }

  /**
   * @return {import("redux").Middleware}
   */
  getMiddleware() {
    return store => {
      this.store = store
      return next => action => {
        if (action.type === this.createActionType("persist")) {
          jsCookie.set(this.options.cookieName, action.payload)
        }
        if (action.type === this.createActionType("logout")) {
          this.login = null
          jsCookie.remove(this.options.cookieName)
        }
        if (action.type === "@@socket/received/invalidateLogin") {
          this.login = null
          jsCookie.remove(this.options.cookieName)
        }
        return next(action)
      }
    }
  }

  getReducer() {
    return (state, action) => {
      if (!state) {
        return {
          loggedIn: Boolean(this.login?.key),
          ...this.login,
        }
      }
      if (typeof action?.type !== "string") {
        return state
      }
      if (!action.type.startsWith(this.options.actionTypePrefix)) {
        return state
      }
      const actionType = action.type.slice(this.options.actionTypePrefix.length)
      if (actionType === "persist") {
        return immer(state, draft => {
          draft.loggedIn = true
          draft.title = action.payload.title
          draft.name = action.payload.name
          draft.key = action.payload.key
        })
      }
      if (actionType === "logout") {
        return immer(state, draft => {
          draft.loggedIn = false
          draft.title = null
          draft.name = null
          draft.key = null
        })
      }
      return state
    }
  }

  createActionType(type) {
    return this.options.actionTypePrefix + type
  }

  logout() {
    this.store.dispatch({
      type: this.createActionType("logout"),
    })
  }

  async dispatchLogin(values) {
    const result = await emitPromise.withDefaultTimeout(this.options.socketClient, "login", values)
    if (result?.error) {
      this.store.dispatch({
        type: this.createActionType("error"),
        payload: {
          action: "login",
          ...result,
        },
      })
      return false
    }
    this.store.dispatch({
      type: this.createActionType("persist"),
      payload: result,
    })
    return true
  }

  async dispatchRegister(values) {
    const result = await emitPromise.withDefaultTimeout(this.options.socketClient, "register", values)
    if (result?.error) {
      this.store.dispatch({
        type: this.createActionType("error"),
        payload: {
          action: "register",
          ...result,
        },
      })
      return false
    }
    this.store.dispatch({
      type: this.createActionType("persist"),
      payload: result,
    })
    return true
  }

}