import PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet"

import Title from "components/Title"

import reduxSockConnect from "src/packages/redux-sock-connect"

import css from "./style.scss"

/**
  * @typedef {{
  *   match: {
  *    isExact: boolean
  *    path: string
  *    url: string
  *    params: object.<string, string>
  *  },
  * }} Props
  */

@reduxSockConnect(props => ({
  event: "profile",
  payload: props.match.params.id,
}))

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class extends React.Component {

  static propTypes = {
    match: PropTypes.exact({
      isExact: PropTypes.bool.isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      params: PropTypes.object,
    }).isRequired,
    fetchedData: PropTypes.object,
  }

  render() {
    if (!this.props.fetchedData?.name) {
      return `No user found for "${this.props.match.params.id}".`
    }
    return <main className={css.container}>
      <Helmet>
        <title>{this.props.fetchedData.title} | Profile on Entity Works</title>
      </Helmet>
      <Title>{this.props.fetchedData.title}</Title>
    </main>
  }

}