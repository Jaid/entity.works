import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import patches from "lib/patches"
import hasContent from "has-content"
import Headline from "components/Headline"
import PatchLines from "components/PatchLines"
import PatchHeadline from "components/PatchHeadline"
import PatchCategory from "components/PatchCategory"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   type: string,
  *   name: string,
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
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }

  render() {
    const filteredPatches = patches.filter(patch => {
      for (const {references} of patch.points |> Object.values) {
        if (references[this.props.type]?.[this.props.name] |> hasContent) {
          return true
        }
      }
      return false
    })
    const content = filteredPatches.map(patch => {
      const headline = <PatchHeadline patchInfo={patch}/>
      const categoriesWithChanges = Object.keys(patch.points).filter(category => {
        return patch.points[category].references[this.props.type]?.[this.props.name]
      })
      const changes = categoriesWithChanges.map(category => {
        const referencingChanges = patch.points[category].references[this.props.type]?.[this.props.name]
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