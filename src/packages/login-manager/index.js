import emitPromise from "emit-promise"
import immer from "immer"
import jsCookie from "js-cookie"

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
    return store => {
      this.store = store
      return next => action => {
      // const authCookie = jsCookie.getJSON(this.options.twitchAuthCookie)
      // if (hasContent(authCookie)) {
        if (action.type === this.createActionType("persist")) {
          jsCookie.set(this.options.cookieName, action.payload)
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
      if (!action.type.startsWith(this.options.prefix)) {
        return state
      }
      const actionType = action.type.slice(this.options.prefix.length)
      if (actionType === "persist") {
        return immer(state, draft => {
          draft.loggedIn = true
          draft.title = action.payload.title
          draft.name = action.payload.name
          draft.key = action.payload.key
        })
      }
      return state
    }
  }

  createActionType(type) {
    return this.options.prefix + type
  }

  async dispatchLogin(values) {
    if (!this.store) {
      throw new Error("Redux store not set in LoginManager")
    }
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
    if (!this.store) {
      throw new Error("Redux store not set in LoginManager")
    }
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