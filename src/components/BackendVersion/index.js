import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import reduxSockConnect from "src/packages/redux-sock-connect"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  * }} Props
  */

@reduxSockConnect({
  event: "getBackendInfo",
})

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    fetchedData: PropTypes.object,
  }

  render() {
    if (!this.props.fetchedData?.version) {
      return null
    }
    return `v${this.props.fetchedData.version}`
  }

}