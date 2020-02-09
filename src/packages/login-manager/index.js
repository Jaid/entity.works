import emitPromise from "emit-promise"
import immer from "immer"
import jsCookie from "js-cookie"

export default class LoginManager {

  constructor(options) {
    this.options = {
      prefix: "@@login/",
      socketClient: null,
      cookieName: "login",
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
        if (action.type === this.createActionType("persist")) {
          jsCookie.set(this.options.cookieName, action.payload)
        }
        if (action.type === this.createActionType("logout")) {
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
    return this.options.prefix + type
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