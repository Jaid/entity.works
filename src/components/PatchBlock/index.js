import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import PatchLines from "components/PatchLines"
import PatchReferenceBlock from "components/PatchReferenceBlock"
import {sortBy} from "lodash"
import perks from "lib/perks"
import PatchHeadline from "components/PatchHeadline"
import PatchCategory from "components/PatchCategory"

import css from "./style.scss"

const getDisplayPriorityFromPatchReference = patchReference => {
  return ["perks", "killers", "survivors", "maps"].indexOf(patchReference.referenceType)
}

const getTitleFromPatchReference = patchReference => {
  if (patchReference.referenceType === "perks") {
    const foundPerk = perks.find(({id}) => id === patchReference.referenceName)
    if (foundPerk) {
      return foundPerk.title
    } else {
      throw new Error(`No perk named ${patchReference.referenceName} found`)
    }
  }
  return patchReference.referenceName
}

const processCategoryBlocks = ([category, {points, references}]) => {
  const patchReferences = []
  for (const referenceType of ["perks", "survivors", "killers", "maps"]) {
    for (const [referenceName, referencePoints] of Object.entries(references[referenceType])) {
      patchReferences.push({
        referenceType,
        referenceName,
        points: referencePoints,
      })
    }
  }
  return <div key={category}>
    <PatchCategory category={category} className={classnames(css.categoryTitle, css[category])}/>
    {sortBy(patchReferences, [getDisplayPriorityFromPatchReference, getTitleFromPatchReference]).map(patchReference => <PatchReferenceBlock key={`${patchReference.referenceType}-${patchReference.referenceName}`} {...patchReference}/>)}
    <PatchLines points={points}/>
  </div>
}

export default class PatchBlock extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    patch: PropTypes.object.isRequired,
  }

  render() {
    const categoryBlocks = Object.entries(this.props.patch.points).map(processCategoryBlocks)
    return <div className={classnames(css.container, this.props.className)}>
      <PatchHeadline patchInfo={this.props.patch}/>
      {categoryBlocks}
    </div>
  }

}