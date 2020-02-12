import emitPromise from "emit-promise"
import ensureObject from "ensure-object"
import {isFunction} from "lodash"
import PropTypes from "prop-types"
import React from "react"

import socket from "lib/socketMiddleware"

export default socketCommand => {
  return function setupPage(TargetComponent) {
    return class extends React.Component {

      displayName = `setupPage(${TargetComponent.displayName || TargetComponent.name || "Component"})`

      constructor(props) {
        super(props)
        if (isFunction(socketCommand)) {
          this.socketCommand = socketCommand(props)
        } else {
          this.socketCommand = socketCommand
        }
        this.socketCommand = ensureObject(this.socketCommand, "event")
      }

      state = {}

      componentDidMount() {
        let fetchJob
        if (this.socketCommand.payload === undefined) {
          fetchJob = emitPromise.withDefaultTimeout(socket, this.socketCommand.event)
        } else {
          fetchJob = emitPromise.withDefaultTimeout(socket, this.socketCommand.event, this.socketCommand.payload)
        }
        fetchJob.then(data => {
          console.log(`Got data from ${this.socketCommand.event}:`, data)
          this.setState({data})
        }).catch(error => {
          console.log(error)
        })
      }

      render() {
        if (this.state.data === undefined) {
          return `Loading ${this.socketCommand.event}`
        }
        return <TargetComponent data={this.state.data} {...this.props}/>
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