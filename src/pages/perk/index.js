import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import perks from "lib/perks"
import PerkBlock from "components/PerkBlock"
import RelevantPatches from "components/RelevantPatches"
import DocumentTitle from "react-document-title"

import css from "./style.scss"

/**
  * @typedef {{
  *  className: *
  *  match: {
  *    isExact: boolean
  *    path: string
  *    url: string
  *    params: object.<string, string>
  *  }
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class PerkPage extends React.Component {

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
    const perkInfo = perks.find(({linkId}) => linkId === this.props.match.params.id)
    return <DocumentTitle title={`${perkInfo.title} in Dead by Daylight`}>
      <main className={classnames(css.container, this.props.className)}>
        <PerkBlock perkInfo={perkInfo}/>
        <RelevantPatches name={perkInfo.id} type="perks"/>
      </main>
    </DocumentTitle>
  }

}