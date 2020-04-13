import PropTypes from "prop-types"
import React from "react"
import {Helmet} from "react-helmet"

import {getFormType} from "lib/formTypes"
import BuildFromDatabase from "components/BuildFromDatabase"
import LinkButton from "components/LinkButton"
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
  event: "getBuild",
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
    if (!this.props.fetchedData?.type) {
      return `No user found for "${this.props.match.params.id}".`
    }
    const buildType = getFormType(this.props.fetchedData.type)
    return <main className={css.container}>
      <Helmet>
        <title>{this.props.fetchedData.data.title || buildType.title} | Dead by Daylight {buildType.title}</title>
      </Helmet>
      <Title>{buildType.title}</Title>
      <BuildFromDatabase entry={this.props.fetchedData}/>
      <div className={css.buttons}>
        <LinkButton to={`/user-builds/${buildType.linkId}`}>See more {buildType.pluralTitle}</LinkButton>
        <LinkButton to={`/build/${buildType.linkId}`}>Build your own {buildType.title}</LinkButton>
      </div>
    </main>
  }

}