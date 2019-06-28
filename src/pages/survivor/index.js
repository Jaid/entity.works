import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import CharacterPage from "components/CharacterPage"
import survivors from "lib/survivors"
import DocumentTitle from "react-document-title"

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
export default class SurvivorPage extends React.Component {

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
    const info = survivors.find(({linkId}) => linkId === this.props.match.params.id)
    const description = info.title
    return <DocumentTitle title={`${info.title} in Dead by Daylight`}>
      <CharacterPage description={description} info={info} type="survivor"/>
    </DocumentTitle>
  }

}