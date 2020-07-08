import classnames from "classnames"
import {sortBy} from "lodash"
import PropTypes from "prop-types"
import React from "react"

import findObject, {findPatch} from "lib/findObject"
import Perk from "lib/Perk"

import PatchCategory from "src/components/PatchCategory"
import PatchHeadline from "src/components/PatchHeadline"
import PatchLines from "src/components/PatchLines"
import PatchReferenceBlock from "src/components/PatchReferenceBlock"

import css from "./style.scss"

const getDisplayPriorityFromPatchReference = patchReference => {
  return ["perk", "killer", "survivor", "map"].indexOf(patchReference.referenceType)
}

const getTitleFromPatchReference = patchReference => {
  if (patchReference.referenceType === "perks") {
    const foundPerk = Perk.find(patchReference.referenceName)
    if (foundPerk) {
      return foundPerk.title
    } else {
      throw new Error(`No perk named ${patchReference.referenceName} found`)
    }
  }
  return patchReference.referenceName
}

export default class PatchBlock extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    patchId: PropTypes.string.isRequired,
  }


  processCategoryBlocks([category, {points, references}]) {
    const patchReferences = []
    for (const [referenceName, referencePoints] of Object.entries(references)) {
      const referenceObject = findObject(referenceName)
      try {
        patchReferences.push({
          referenceType: referenceObject.type,
          referenceName: referenceObject.id,
          points: referencePoints,
        })
      } catch (error) {
        console.warn(`Could not find "${referenceName}" referenced in ${this.props.patchId}/${category}`)
        throw error
      }
    }
    const sortedReferences = sortBy(patchReferences, [getDisplayPriorityFromPatchReference, getTitleFromPatchReference])
    return <div key={category}>
      <PatchCategory category={category} className={classnames(css.categoryTitle, css[category])}/>
      {sortedReferences.map(patchReference => <PatchReferenceBlock key={`${patchReference.referenceType}-${patchReference.referenceName}`} {...patchReference}/>)}
      <PatchLines points={points}/>
    </div>
  }

  render() {
    const patch = findPatch(this.props.patchId)
    const categoryBlocks = Object.entries(patch.points).map(category => this.processCategoryBlocks(category))
    return <div className={classnames(css.container, this.props.className)}>
      <PatchHeadline patchInfo={patch}/>
      {categoryBlocks}
    </div>
  }

}