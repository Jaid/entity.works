import {applyMiddleware, compose, createStore} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import {createLogger} from "redux-logger"
import {responsiveStoreEnhancer} from "redux-responsive"

import commonMiddleware from "./commonMiddleware"
import reducer from "./reducer"

const logger = createLogger({
  level: "info",
  collapsed: true,
})

const store = createStore(reducer, compose(responsiveStoreEnhancer, applyMiddleware(...commonMiddleware, logger) |> composeWithDevTools))

if (module.hot) {
  module.hot.accept("./reducer", () => store.replaceReducer(require("./reducer").default))
}

export default store