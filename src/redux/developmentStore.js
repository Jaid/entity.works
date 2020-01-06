import {applyMiddleware, createStore} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import {createLogger} from "redux-logger"

import commonMiddleware from "./commonMiddleware"
import reducer from "./reducer"

const logger = createLogger({
  level: "info",
  collapsed: true,
})

const store = createStore(reducer, applyMiddleware(...commonMiddleware, logger) |> composeWithDevTools)

if (module.hot) {
  module.hot.accept("./reducer", () => store.replaceReducer(require("./reducer").default))
}

export default store