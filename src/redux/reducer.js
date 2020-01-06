import immer from "immer"
import {combineReducers} from "redux"

import loginManager from "lib/loginManager"
import {socketMiddleware} from "lib/socketMiddleware"

import query from "src/query"

const mainReducer = (state, action) => {
  if (!state) {
    return {
    }
  }
  return state
}

export default combineReducers({
  main: mainReducer,
  socket: socketMiddleware.reducer,
  login: loginManager.getReducer(),
})