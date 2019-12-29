import classnames from "classnames"
import {isEmpty} from "has-content"
import PropTypes from "prop-types"
import React from "react"
import {Link} from "react-router-dom"
import zahl from "zahl"

import findObject from "lib/findObject"
import findPatchesForReferenece from "lib/findPatchesForReference"
import RichText from "components/RichText"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   referenceId: string,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class PatchesForReferenceText extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    referenceId: PropTypes.string.isRequired,
  }

  render() {
    const object = findObject(this.props.referenceId)
    const patches = findPatchesForReferenece(object.id)
    if (isEmpty(patches)) {
      return null
    }
    const richText = `{${object.id}}`
    const richBox = <RichText>{richText}</RichText>
    return <div className={classnames(css.container, this.props.className)}>
      <Link to={`/patches/for/${object.linkId}`}>{zahl(patches, "patch")}</Link> affected {richBox}.
    </div>
  }

}