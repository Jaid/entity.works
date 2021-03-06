import PropTypes from "prop-types"
import React from "react"
import {Helmet} from "react-helmet"

import {getFormType} from "lib/formTypes"
import BuildFromDatabase from "src/components/BuildFromDatabase"
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
  event: "getBuilds",
  payload: {
    type: getFormType(props.match.params.type).id,
  },
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
    fetchedData: PropTypes.array,
  }

  render() {
    if (!this.props.fetchedData) {
      return null
    }
    const elements = this.props.fetchedData.rows.map(entry => {
      return <BuildFromDatabase key={entry.linkId} className={css.build} entry={entry}/>
    })
    const formType = getFormType(this.props.match.params.type)
    return <main className={css.container}>
      <Helmet>
        <title>Latest {formType.title}s | Entity Works</title>
      </Helmet>
      <Title>Latest {formType.title}s</Title>
      {elements}
    </main>
  }

}