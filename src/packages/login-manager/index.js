import immer from "immer"
import jsCookie from "js-cookie"
import {parse} from "query-string"
import React from "react"
import {connect} from "react-redux"
import {Redirect, Route} from "react-router-dom"

export default class LoginManager {

  constructor(options) {
    this.options = {
      prefix: "@@login/",
      socketClient: null,
      callbackPath: "/callback",
      cookieName: "login",
      loginRedirectUrl: "/",
      ...options,
    }
    this.login = jsCookie.getJSON(this.options.cookieName)
  }

  /**
   * @return {import("redux").Middleware}
   */
  getMiddleware() {
    return store => next => action => {
      // const authCookie = jsCookie.getJSON(this.options.twitchAuthCookie)
      // if (hasContent(authCookie)) {
      //   if (action.type === "@@socket/loggedIn") {
      //     store.dispatch({
      //       type: "@@socket/send/login",
      //       payload: authCookie,
      //     })
      //   }
      // }
      if (action.type === "@@socket/persistLogin") {
        jsCookie.set(this.options.cookieName, action.payload)
      }
      return next(action)
    }
  }

  getReducer() {
    console.log(this)
    return (state, action) => {
      if (!state) {
        return {
          loggedIn: false,
          ...this.login,
        }
      }
      if (typeof action?.type !== "string") {
        return state
      }
      if (action.type === "@@socket/received/loggedIn") {
        return immer(state, draft => {
          draft.loggedIn = true
          draft.displayName = action.payload.displayName
          draft.twitchId = action.payload.twitchId
        })
      }
      if (action.type === "@@socket/received/twitchAuthUrl") {
        return immer(state, draft => {
          draft.authUrl = action.payload
        })
      }
      if (action.type === "@@socket/received/persistLogin") {
        jsCookie.set(this.options.cookieName, action.payload)
        return immer(state, draft => {
          draft.apiKey = action.payload.apiKey
          draft.displayName = action.payload.displayName
        })
      }
      if (!action.type.startsWith(this.options.prefix)) {
        return state
      }
      const actionType = action.type.slice(this.options.prefix.length)
      return state
    }
  }

  getCallbackPage() {
    const CallbackPage = class extends React.Component {

      displayName = "CallbackPage"

      constructor(props) {
        super(props)
        console.log(props)
        const query = parse(document.location.search)
        this.code = query.code
        this.state = {
        }
      }

      componentDidMount() {
        if (this.state.redirect) {
          return
        }
        this.props.dispatch({
          type: "@@socket/send/login",
          payload: {
            code: this.code,
          },
        })
      }

      render() {
        if (this.props.apiKey) {
          return <Redirect to="/"/>
        }
        // if (this.state.result === false) {
        //   return "Login did not work."
        // }
        return "Logging in..."
      }

    }
    return connect(state => ({
      apiKey: state.login.apiKey,
    }))(CallbackPage)
  }

  getCallbackRoute() {
    return <Route component={this.getCallbackPage()} path={this.options.callbackPath} exact/>
  }

}