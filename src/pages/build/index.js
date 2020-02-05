import PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet"

import LinkButton from "components/LinkButton"
import Title from "components/Title"

import formTypes from "./formTypes"
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
    const links = Object.entries(formTypes).map(([id, formType]) => {
      return <div key={id}>
        <LinkButton to={`/build/${formType.linkId}`}>Build {formType.title}</LinkButton>
      </div>
    })
    return <main className={css.container}>
      <Helmet>
        <title>Build | Entity Works</title>
      </Helmet>
      <Title>Build</Title>
      {links}
    </main>
  }

}