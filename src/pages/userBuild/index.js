import PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet"

import {getFormType} from "lib/formTypes"
import Build from "components/Build"
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
    data: PropTypes.object,
  }

  render() {
    if (!this.props.data?.type) {
      return `No user found for "${this.props.match.params.id}".`
    }
    const buildType = getFormType(this.props.data.type)
    return <main className={css.container}>
      <Helmet>
        <title>{this.props.data.data.title || buildType.title} | Dead by Daylight {buildType.title}</title>
      </Helmet>
      <Title>{buildType.title}</Title>
      <Build data={this.props.data.data} type={this.props.data.type} userName={this.props.data.userName} userTitle={this.props.data.userTitle}/>
    </main>
  }

}