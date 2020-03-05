import offlineRuntime from "offline-plugin/runtime"
import React from "react"
import ReactDom from "react-dom"
import {Provider} from "react-redux"

import App from "components/App"

import store from "src/redux/productionStore"

offlineRuntime.install({
  onUpdating: () => {
    console.debug("SW Event:", "onUpdating")
    store.dispatch({
      type: "@@offlinePlugin/updating",
    })
  },
  onUpdateReady: () => {
    console.debug("SW Event:", "onUpdateReady")
    store.dispatch({
      type: "@@offlinePlugin/updateReady",
    })
    offlineRuntime.applyUpdate()
  },
  onUpdated: () => {
    console.debug("SW Event:", "onUpdated")
    store.dispatch({
      type: "@@offlinePlugin/updated",
    })
  },
  onUpdateFailed: () => {
    console.debug("SW Event:", "onUpdateFailed")
    store.dispatch({
      type: "@@offlinePlugin/updateFailed",
    })
  },
})

const rootNode = document.querySelector("body > div")

ReactDom.render(<Provider store={store}>
  <App/>
</Provider>, rootNode)