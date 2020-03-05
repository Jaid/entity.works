import React from "react"
import ReactDom from "react-dom"
import {Provider} from "react-redux"

import HotApp from "components/HotApp"

import store from "src/redux/developmentStore"

const rootNode = document.querySelector("body > div")

ReactDom.render(<Provider store={store}>
  <HotApp/>
</Provider>, rootNode)