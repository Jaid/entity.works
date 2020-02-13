import PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet"

import Title from "components/Title"
import UserContentOverview from "components/UserContentOverview"

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
export default class BuildsPage extends React.Component {

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
    return <main className={css.container}>
      <Helmet>
        <title>User Builds | Entity Works</title>
      </Helmet>
      <Title>Build Types</Title>
      <UserContentOverview/>
    </main>
  }

}