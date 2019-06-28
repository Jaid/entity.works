import React from "react"
import PropTypes from "prop-types"
import CharacterPage from "components/CharacterPage"

import css from "./style.scss"

/**
  * @typedef {{
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
    match: PropTypes.exact({
      isExact: PropTypes.bool.isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      params: PropTypes.object,
    }).isRequired,
  }

  render() {
    return <CharacterPage linkId={this.props.match.params.id} type="killer"/>
  }

}