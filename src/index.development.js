import React from "react"
import ReactDom from "react-dom"
import HotApp from "components/HotApp"
import {Provider} from "react-redux"
import {createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {createLogger} from "redux-logger"
import {composeWithDevTools} from "redux-devtools-extension"

import soundMiddleware from "./redux/sound"
import socketMiddleware from "./redux/socket"
import reducer from "./redux/reducer"

const logger = createLogger({
  level: "info",
  collapsed: true,
})
const enhancer = composeWithDevTools(applyMiddleware(thunk, socketMiddleware, soundMiddleware, logger))
const store = createStore(reducer, enhancer)
if (module.hot) {
  module.hot.accept("./redux/reducer", () => store.replaceReducer(require("./redux/reducer").default))
}

const rootNode = document.createElement("div")
document.body.append(rootNode)

ReactDom.render(<Provider store={store}>
  <HotApp/>
</Provider>, rootNode)