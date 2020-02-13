import {isEmpty} from "has-content"
import PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet"
import zahl from "zahl"

import BuildFromDatabase from "components/BuildFromDatabase"
import SmallerTitle from "components/SmallerTitle"
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
  event: "getProfile",
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

  getLatestBuilds() {
    if (isEmpty(this.props.fetchedData.latestBuilds)) {
      return null
    }
    const buildElements = this.props.fetchedData.latestBuilds.map(entry => {
      return <BuildFromDatabase key={entry.linkId} className={css.build} entry={entry}/>
    })
    return <div>
      <SmallerTitle>{zahl(buildElements, "contributed build")}</SmallerTitle>
      {buildElements}
    </div>
  }

  render() {
    if (!this.props.fetchedData?.user) {
      return `No user found for "${this.props.match.params.id}".`
    }
    return <main className={css.container}>
      <Helmet>
        <title>{this.props.fetchedData.user.title} | Profile on Entity Works</title>
      </Helmet>
      <Title>{this.props.fetchedData.user.title}</Title>
      {this.getLatestBuilds()}
    </main>
  }

}