import offlineRuntime from "offline-plugin/runtime"
import React from "react"
import ReactDom from "react-dom"
import {Provider} from "react-redux"

import App from "components/App"

import store from "src/redux/productionStore"

offlineRuntime.install({
  onUpdating: () => {
    console.debug("SW Event:", "onUpdating")
  },
  onUpdateReady: () => {
    console.debug("SW Event:", "onUpdateReady")
    offlineRuntime.applyUpdate()
  },
  onUpdated: () => {
    console.debug("SW Event:", "onUpdated")
    // window.location.reload()
  },
  onUpdateFailed: () => {
    console.debug("SW Event:", "onUpdateFailed")
  },
})

const rootNode = document.createElement("div")
document.body.append(rootNode)

ReactDom.render(<Provider store={store}>
  <App/>
</Provider>, rootNode)