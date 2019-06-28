import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import NavigationPage from "components/NavigationPage"
import killers from "lib/killers"

import css from "./style.scss"

/**
  * @typedef {{
  *  className: *,
  *  match: {
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
export default class KillerPage extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    match: PropTypes.exact({
      isExact: PropTypes.bool.isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      params: PropTypes.object,
    }).isRequired,
  }

  render() {
    const content = <span>Page killer</span>
    const links = killers.map(killer => ({
      to: `/killer/${killer.id}`,
      text: killer.shortTitle,
    }))
    return <NavigationPage links={links}>{content}</NavigationPage>
  }

}