import PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet"

import {getFormType} from "lib/formTypes"
import Title from "components/Title"

import setupPage from "../setupPage"
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

@setupPage(props => ({
  event: "getLatestBuilds",
  payload: {
    where: {
      type: getFormType(props.match.params.type).id,
    },
  },
}))

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class BuildsForTypePage extends React.Component {

  static propTypes = {
    match: PropTypes.exact({
      isExact: PropTypes.bool.isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      params: PropTypes.object,
    }).isRequired,
    data: PropTypes.object,
  }

  render() {
    const formType = getFormType(this.props.match.params.type)
    return <main className={css.container}>
      <Helmet>
        <title>Latest {formType.title}s | Entity Works</title>
      </Helmet>
      <Title>Latest {formType.title}s</Title>
    </main>
  }

}