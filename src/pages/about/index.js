import PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet"

import BackendVersion from "components/BackendVersion"
import Title from "components/Title"

import html from "./about.md"
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
export default class AboutPage extends React.Component {

  static propTypes = {
    match: PropTypes.exact({
      isExact: PropTypes.bool.isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      params: PropTypes.object,
    }).isRequired,
  }

  render() {
    return <main className={css.container}>
      <Helmet>
        <title>About | Entity Works</title>
      </Helmet>
      <Title>Entity Works</Title>
      <div dangerouslySetInnerHTML={{__html: html}}/>
      <div>Entity Works v{process.env.version}</div>
      <div>entity-serves <BackendVersion/></div>
    </main>
  }

}