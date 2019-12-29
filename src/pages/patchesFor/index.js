import {camelCase} from "camel-case"
import classnames from "classnames"
import {paramCase} from "param-case"
import PropTypes from "prop-types"
import React from "react"
import DocumentTitle from "react-document-title"

import findObject from "lib/findObject"
import perks from "lib/perks"
import RelevantPatches from "components/RelevantPatches"
import RichText from "components/RichText"

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
    const referenceObject = findObject(this.props.match.params.id)
    if (!referenceObject) {
      return "Nothing found."
    }
    const richTextReference = `{${referenceObject.id}}`
    return <DocumentTitle title={`${referenceObject.title} Changelog · Dead by Daylight Patch Notes`}>
      <main className={classnames(css.container, this.props.className)}>
        <h1>
          <RichText>Changelog of {richTextReference}</RichText>
        </h1>
        <RelevantPatches referenceId={referenceObject.id}/>
      </main>
    </DocumentTitle>
  }

}