import PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet"

import BuildForm from "components/BuildForm"
import Title from "components/Title"

import {getFormType} from "../build/formTypes"
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

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class BuildPage extends React.Component {

  static propTypes = {
    match: PropTypes.exact({
      isExact: PropTypes.bool.isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      params: PropTypes.object,
    }).isRequired,
  }

  render() {
    const formType = getFormType(this.props.match.params.formType)
    return <main className={css.container}>
      <Helmet>
        <title>{formType.pageTitle} | Entity Works</title>
      </Helmet>
      <Title>{formType.pageTitle}</Title>
      <BuildForm FormComponent={formType.FormComponent}/>
    </main>
  }

}