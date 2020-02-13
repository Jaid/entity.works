import emitPromise from "emit-promise"
import ensureObject from "ensure-object"
import {isFunction} from "lodash"
import PropTypes from "prop-types"
import React from "react"
import readableMs from "readable-ms"

import socket from "lib/socketMiddleware"

export default socketCommand => {
  return function setupPage(TargetComponent) {
    const childComponentName = TargetComponent.displayName || TargetComponent.name || "Component"
    return class extends React.Component {

      static displayName = `redux-sock-connect(${childComponentName})`

      constructor(props) {
        super(props)
        if (isFunction(socketCommand)) {
          this.socketCommand = socketCommand(props)
        } else {
          this.socketCommand = socketCommand
        }
        this.socketCommand = ensureObject(this.socketCommand, "event")
      }

      state = {
        fetchedData: null,
        fetchState: "fetching",
      }

      componentDidMount() {
        const startTime = Date.now()
        let fetchJob
        if (this.socketCommand.payload === undefined) {
          fetchJob = emitPromise.withDefaultTimeout(socket, this.socketCommand.event)
        } else {
          fetchJob = emitPromise.withDefaultTimeout(socket, this.socketCommand.event, this.socketCommand.payload)
        }
        fetchJob.then(fetchedData => {
          console.debug(`Fetched data for ${childComponentName} from ${this.socketCommand.event} in ${readableMs(Date.now() - startTime)}`, fetchedData)
          this.setState({
            fetchedData,
            fetchState: "success",
          })
        }).catch(error => {
          console.error(error)
          this.setState({
            fetchState: "fail",
          })
        })
      }

      render() {
        if (this.state.fetchState === "fetching") {
          return `Loading ${this.socketCommand.event}`
        }
        return <TargetComponent {...this.state} {...this.props}/>
      }

    }
  }
}

/**
  * @typedef {{
  *  match: {
  *    isExact: boolean
  *    path: string
  *    url: string
  *    params: object.<string, string>
  *  },
  *  data: *,
  * }} Props
  */

export const propTypes = {
  match: PropTypes.exact({
    isExact: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    params: PropTypes.object,
  }).isRequired,
  className: PropTypes.any,
  data: PropTypes.any,
}