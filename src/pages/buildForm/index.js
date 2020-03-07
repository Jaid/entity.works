import emitPromise from "emit-promise"
import PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet"
import {withRouter} from "react-router-dom"

import {getFormType} from "lib/formTypes"
import socketClient from "lib/socketMiddleware"
import BuildForm from "components/BuildForm"
import Title from "components/Title"

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

@withRouter

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
    history: PropTypes.object.isRequired,
  }

  async handleSubmit(formType, values) {
    const result = await emitPromise.withDefaultTimeout(socketClient, "addBuild", {
      formType,
      formData: values,
    })
    console.log(result)
    if (result?.error) {
      console.error(result)
    }
    this.props.history.push(`/user-build/${result.id}/${result.seoLinkId}`)
  }

  render() {
    const formType = getFormType(this.props.match.params.formType)
    return <main className={css.container}>
      <Helmet>
        <title>{formType.pageTitle} | Entity Works</title>
      </Helmet>
      <Title>{formType.pageTitle}</Title>
      <BuildForm formType={formType} onSubmit={values => this.handleSubmit(formType.id, values)}/>
    </main>
  }

}