import moment from "moment"
import {ensureObject, ensureArray} from "magina"
import forOwn from "for-own.macro"
import hasContent from "has-content"
import aliasFields from "alias-fields"
import {toPairs, fromPairs, sortBy} from "lodash"

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

export default patches => patches
  |> #.map(patch => ({
    dateMs: Number(moment(patch.date, "DD.MM.YYYY")),
    id: patch.semver,
    ...patch,
  }))
  |> #.sort((a, b) => b.dateMs - a.dateMs)
  |> #.map(patch => {
    for (const [categoryId, categoryPoints] of Object.entries(patch.points)) {
      const categoryPointsNormalized = ensureArray(categoryPoints)
      patch.points[categoryId] = {
        points: categoryPointsNormalized,
        references: {}
      }
      categoryPointsNormalized.forEach((point, index) => {
        const pointNormalized = ensureObject(point, "text")
        if (pointNormalized.for) {
          pointNormalized.for = point.for.split(",").map(id => id.trim())
          for (const reference of point.for) {
            if (!patch.points[categoryId].references[reference]) {
              patch.points[categoryId].references[reference] = []
            }
            patch.points[categoryId].references[reference].push(pointNormalized)
          }
        }
        patch.points[categoryId].points[index] = pointNormalized
        patch.points = patch.points // Based on https://github.com/lodash/lodash/issues/1459#issuecomment-253969771
          |> toPairs
          |> sortBy(#, ([key]) => sortCategories(key))
          |> fromPairs
      })
    }
    return patch
  })