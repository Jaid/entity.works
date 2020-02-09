import PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet"

import Title from "components/Title"

import setupPage from "src/pages/setupPage"

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
  event: "profile",
  payload: props.match.params.id,
}))

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class UserPage extends React.Component {

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
    if (!this.props.data?.name) {
      return `No user found for "${this.props.match.params.id}".`
    }
    return <main className={css.container}>
      <Helmet>
        <title>{this.props.data.title} | Profile on Entity Works</title>
      </Helmet>
      <Title>{this.props.data.title}</Title>
    </main>
  }

}