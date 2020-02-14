import React from "react"
import ReactDom from "react-dom"
import {Provider} from "react-redux"

import App from "components/App"

import store from "src/redux/productionStore"

const offlineRuntime = require("offline-plugin/runtime")

offlineRuntime.install({
  onUpdating: () => {
    console.log("SW Event:", "onUpdating")
  },
  onUpdateReady: () => {
    console.log("SW Event:", "onUpdateReady")
    // Tells to new SW to take control immediately
    offlineRuntime.applyUpdate()
  },
  onUpdated: () => {
    console.log("SW Event:", "onUpdated")
    // Reload the webpage to load into the new version
    window.location.reload()
  },

  onUpdateFailed: () => {
    console.log("SW Event:", "onUpdateFailed")
  },
})

const rootNode = document.createElement("div")
document.body.append(rootNode)

ReactDom.render(<Provider store={store}>
  <App/>
</Provider>, rootNode)