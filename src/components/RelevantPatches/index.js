import classnames from "classnames"
import {isEmpty} from "has-content"
import PropTypes from "prop-types"
import React from "react"
import {Link} from "react-router-dom"

import findObject from "lib/findObject"
import findPatchesForReference from "lib/findPatchesForReference"
import PatchCategory from "src/components/PatchCategory"
import PatchHeadline from "src/components/PatchHeadline"
import PatchLines from "src/components/PatchLines"
import TextSection from "src/components/TextSection"

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
export default class RelevantPatches extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    referenceId: PropTypes.string.isRequired,
  }

  getContent() {
    const object = findObject(this.props.referenceId)
    const patches = findPatchesForReference(object.id)
    if (isEmpty(patches)) {
      return `No changelog found for ${object.title}.`
    }
    return Object.values(patches).map(patch => {
      const headline = <PatchHeadline patchInfo={patch}/>
      const changes = Object.keys(patch.points).map(category => {
        return <div key={category} className={css.categoryBlock}>
          <PatchCategory category={category} className={css.patchCategory}/>
          <PatchLines points={patch.points[category]} showReferences/>
        </div>
      })
      return <div key={patch.semver} className={css.patchBlock}>
        {headline}
        {changes}
        <TextSection>
          <Link to={`/patch/${patch.linkId}`}>View full patch {patch.semver}</Link>
        </TextSection>
      </div>
    })
  }

  render() {
    return <div className={classnames(css.container, this.props.className)}>
      {this.getContent()}
    </div>
  }

}