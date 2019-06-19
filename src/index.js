import React from "react"
import ReactDom from "react-dom"
import App from "components/App"
import {Provider} from "react-redux"
import {createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"

import soundMiddleware from "./redux/sound"
import socketMiddleware from "./redux/socket"
import reducer from "./redux/reducer"

const enhancer = applyMiddleware(thunk, socketMiddleware, soundMiddleware)
const store = createStore(reducer, enhancer)

const rootNode = document.createElement("div")
document.body.append(rootNode)

ReactDom.render(<Provider store={store}>
  <App/>
</Provider>, rootNode)