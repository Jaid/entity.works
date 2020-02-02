import aliasFields from "alias-fields"
import deadByDaylight from "dead-by-daylight"
import ensureArray from "ensure-array"
import ensureObject from "ensure-object"
import forOwn from "for-own.macro"
import hasContent from "has-content"
import {fromPairs, sortBy, toPairs} from "lodash"
import {paramCase} from "param-case"

import patchContents from /* aot */ "src/aotLoaders/patchContents"

const sortCategories = category => {
  if (category === "features") {
    return -4
  }
  if (category === "balance") {
    return -3
  }
  if (category === "fixes") {
    return -2
  }
  if (category === "issues") {
    return -1
  }
  return category
}

class Patch {

  /**
   * @type {string}
   */
  id = null

  /**
   * @type {string}
   */
  linkId = null

  setContent(content) {
    this.points = content
    for (const [categoryId, categoryPoints] of Object.entries(this.points)) {
      const categoryPointsNormalized = ensureArray(categoryPoints)
      this.points[categoryId] = {
        points: categoryPointsNormalized,
        references: {},
      }
      categoryPointsNormalized.forEach((point, index) => {
        const pointNormalized = ensureObject(point, "text")
        if (pointNormalized.for) {
          pointNormalized.for = point.for.split(",").map(id => id.trim())
          for (const reference of point.for) {
            if (!this.points[categoryId].references[reference]) {
              this.points[categoryId].references[reference] = []
            }
            this.points[categoryId].references[reference].push(pointNormalized)
          }
        }
        this.points[categoryId].points[index] = pointNormalized
        this.points = fromPairs(sortBy(toPairs(this.points), ([key]) => sortCategories(key))) // Based on https://github.com/lodash/lodash/issues/1459#issuecomment-253969771
      })
    }

  }

}

Patch.all = Object.entries(deadByDaylight.patches).map(([id, basePatch]) => {
  const patch = new Patch
  patch.id = id
  patch.semver = patch.id
  patch.title = basePatch.title === id ? `Patch ${patch.id}` : basePatch.title
  patch.linkId = paramCase(patch.semver)
  patch.date = basePatch.date
  const content = patchContents[id]
  if (content) {
    patch.setContent(content)
  }
  return patch
})

Patch.all.sort((a, b) => b.date - a.date)

Patch.find = id => {
  return Patch.all.find(patch => patch.id === id) || Patch.all.find(patch => patch.linkId === id) || Patch.all.find(patch => patch.semver === id) || Patch.all.find(patch => paramCase(patch.title) === id)
}

export default Patch