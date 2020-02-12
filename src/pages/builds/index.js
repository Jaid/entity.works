import PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet"
import {Link} from "react-router-dom"
import zahl from "zahl"

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

@setupPage({
  event: "getBuildTypes",
})

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class BuildsPage extends React.Component {

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
    const typesElements = Object.entries(this.props.data).map(([formTypeId, count]) => {
      const formType = getFormType(formTypeId)
      return <div key={formTypeId}>
        <Link to={`user-builds/${formType.linkId}`}>{zahl(count, formType.title)}</Link>
      </div>
    })
    return <main className={css.container}>
      <Helmet>
        <title>User Builds | Entity Works</title>
      </Helmet>
      <Title>Build Types</Title>
      {typesElements}
    </main>
  }

}