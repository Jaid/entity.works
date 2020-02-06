import {camelCase} from "camel-case"
import {paramCase} from "param-case"
import PropTypes from "prop-types"
import React from "react"
import {Helmet} from "react-helmet"

import Killer from "lib/Killer"
import CharacterPage from "components/CharacterPage"
import Title from "components/Title"

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
    const info = Killer.find(this.props.match.params.id)
    if (!info) {
      return `No killer found for "${this.props.match.params.id}".`
    }
    const description = `POWER: ${info.powerTitle}\n\n${info.richEffect}`
    return <main>
      <Helmet>
        <title>{info.title} | Dead by Daylight Killer</title>
      </Helmet>
      <CharacterPage description={description} info={info} type="killer"/>
    </main>
  }

}