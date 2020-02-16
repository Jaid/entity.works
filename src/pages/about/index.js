import PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet"

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
      <p>
        <div>Entity Works v{process.env.version}</div>
      </p>
      <p>
        <div>Source code is available here: <a href="https://github.com/Jaid/entity.works">github.com/Jaid/entity.works</a></div>
        <div>Most of the static data is available as an npm package: <a href="https://github.com/Jaid/dead-by-daylight">dead-by-daylight</a></div>
      </p>
      <p>
        Contains official Dead by Daylight content copied from the <a href="https://store.steampowered.com/app/381210">Steam release</a>. Copyright by <a href="https://bhvr.com">Behaviour Interactive</a>.
      </p>
    </main>
  }

}