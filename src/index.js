import React from "react"
import ReactDom from "react-dom"
import {Provider} from "react-redux"
import {applyMiddleware, createStore} from "redux"

import App from "components/App"

import reducer from "./redux/reducer"

require("offline-plugin/runtime").install()

const enhancer = applyMiddleware()
const store = createStore(reducer, enhancer)

const rootNode = document.createElement("div")
document.body.append(rootNode)

ReactDom.render(<Provider store={store}>
  <App/>
</Provider>, rootNode)