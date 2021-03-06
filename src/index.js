import offlineRuntime from "offline-plugin/runtime"
import React from "react"
import ReactDom from "react-dom"
import {Provider} from "react-redux"

import App from "src/components/App"
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
    // store.dispatch({
    //   type: "@@toast/make",
    //   payload: `Updated to ${_PKG_VERSION}`,
    // })
    store.dispatch({
      type: "@@offlinePlugin/updateReady",
    })
    offlineRuntime.applyUpdate()
  },
  onUpdated: () => {
    console.debug("SW Event:", "onUpdated")
    // store.dispatch({
    //   type: "@@toast/make",
    //   payload: "Update ready, please refresh me!",
    // })
    store.dispatch({
      type: "@@offlinePlugin/updated",
    })
  },
  onUpdateFailed: () => {
    console.debug("SW Event:", "onUpdateFailed")
    // store.dispatch({
    //   type: "@@toast/make",
    //   payload: "Update failed",
    // })
    store.dispatch({
      type: "@@offlinePlugin/updateFailed",
    })
  },
})

const rootNode = document.querySelector("body > div")

ReactDom.render(<Provider store={store}>
  <App/>
</Provider>, rootNode)