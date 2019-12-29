import classnames from "classnames"
import hasContent from "has-content"
import PropTypes from "prop-types"
import React from "react"

import patches from "lib/patches"
import PatchCategory from "components/PatchCategory"
import PatchHeadline from "components/PatchHeadline"
import PatchLines from "components/PatchLines"

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

  render() {
    const filteredPatches = patches.filter(patch => {
      for (const {references} of Object.values(patch.points)) {
        if (hasContent(references[this.props.referenceId])) {
          return true
        }
      }
      return false
    })
    const content = filteredPatches.map(patch => {
      const headline = <PatchHeadline patchInfo={patch}/>
      const categoriesWithChanges = Object.keys(patch.points).filter(category => {
        return patch.points[category].references[this.props.referenceId]
      })
      const changes = categoriesWithChanges.map(category => {
        const referencingChanges = patch.points[category].references[this.props.referenceId]
        return <div key={category} className={css.categoryBlock}>
          <PatchCategory category={category} className={css.patchCategory}/>
          <PatchLines points={referencingChanges} showReferences/>
        </div>
      })
      return <div key={patch.semver} className={css.patchBlock}>{headline}{changes}</div>
    })
    return <div className={classnames(css.container, this.props.className)}>
      {content}
    </div>
  }

}