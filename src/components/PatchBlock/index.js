import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import moment from "moment"
import PatchLines from "components/PatchLines"
import PatchReferenceBlock from "components/PatchReferenceBlock"
import {sortBy} from "lodash"
import perks from "lib/perks"

import css from "./style.scss"

const getHeaderText = patch => {
  const agoString = moment(patch.dateMs).fromNow()
  if (patch.title) {
    return {
      title: patch.title,
      info: `${patch.semver} - ${agoString}`,
    }
  } else {
    return {
      title: `PATCH ${patch.semver}`,
      info: agoString,
    }
  }
}

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

export default class PatchBlock extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    patch: PropTypes.object.isRequired,
  }

  render() {
    const headerText = getHeaderText(this.props.patch)
    const categoryBlocks = Object.entries(this.props.patch.points).map(([category, {points, references}]) => {
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
        <div className={classnames(css.categoryTitle, css[category])}>{category}</div>
        {sortBy(patchReferences, [getDisplayPriorityFromPatchReference, getTitleFromPatchReference]).map(patchReference => <PatchReferenceBlock key={`${patchReference.referenceType}-${patchReference.referenceName}`} {...patchReference}/>)}
        <PatchLines points={points}/>
      </div>
    })
    return <div className={classnames(css.container, this.props.className)}>
      <div className={css.header}>
        <div className={css.headerInfo}>{headerText.info}</div>
        <div className={css.title}>{headerText.title}</div>
      </div>
      {categoryBlocks}
    </div>
  }

}