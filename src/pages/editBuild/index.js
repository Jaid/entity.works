import emitPromise from "emit-promise"
import PropTypes from "prop-types"
import React from "react"

import {getFormType} from "lib/formTypes"
import socketClient from "lib/socketMiddleware"
import BuildForm from "src/components/BuildForm"
import Title from "src/components/Title"

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
export default class EditBuildPage extends React.Component {

  static propTypes = {
    match: PropTypes.exact({
      isExact: PropTypes.bool.isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      params: PropTypes.object,
    }).isRequired,
    history: PropTypes.object.isRequired,
    fetchedData: PropTypes.object,
  }

  async handleSubmit(values) {
    const result = await emitPromise.withDefaultTimeout(socketClient, "editBuild", {
      id: this.props.match.params.id,
      formData: values,
    })
    if (result?.error) {
      console.error(result)
      return
    }
    this.props.history.push(`/user-build/${result.id}/${result.seoLinkId}`)
  }

  render() {
    if (!this.props.fetchedData) {
      return null
    }
    const formType = getFormType(this.props.fetchedData.type)
    return <main className={css.container}>
      <Title>Edit Build</Title>
      <BuildForm formType={formType} initialValues={this.props.fetchedData.data} onSubmit={values => this.handleSubmit(values)}/>
    </main>
  }

}