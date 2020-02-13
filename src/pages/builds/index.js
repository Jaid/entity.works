import PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet"

import {getFormType} from "lib/formTypes"
import ContentLinkList from "components/ContentLinkList"
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

@reduxSockConnect({
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
    fetchedData: PropTypes.object,
  }

  render() {
    const links = this.props.fetchedData.map(entry => {
      const formType = getFormType(entry.type)
      return {
        to: `user-builds/${formType.linkId}`,
        count: entry.count,
        text: `${formType.title}s`,
      }
    })
    return <main className={css.container}>
      <Helmet>
        <title>User Builds | Entity Works</title>
      </Helmet>
      <Title>Build Types</Title>
      <ContentLinkList links={links}/>
    </main>
  }

}