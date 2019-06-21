import patches from /* aot */ "src/data/patches"
import moment from "moment"
import {ensureObject, ensureArray} from "magina"
import forOwn from "for-own.macro"
import hasContent from "has-content"
import aliasFields from "alias-fields"

export default patches
  |> #.map(patch => ({
    dateMs: Number(moment(patch.date, "DD.MM.YYYY")),
    ...patch,
  }))
  |> #.sort((a, b) => b.dateMs - a.dateMs)
  |> #.map(patch => {
    for (const [categoryId, categoryPoints] of Object.entries(patch.points)) {
      const categoryPointsNormalized = categoryPoints |> ensureArray
      patch.points[categoryId] = {
        points: categoryPointsNormalized,
        references: {
          killers: {},
          survivors: {},
          perks: {},
          maps: {},
        },
      }
      const references = {
        killers: {},
        survivors: {},
        perks: {},
        maps: {},
      }
      categoryPointsNormalized.forEach((point, index) => {
        const pointNormalized = point
        |> ensureObject(#, "text")
        |> aliasFields(#, {
          killers: "killer",
          perks: "perk",
          survivors: "survivor",
          maps: "map",
        })
        patch.points[categoryId].points[index] = pointNormalized
        for (const referenceType in forOwn(references)) {
          if (pointNormalized[referenceType]) {
            const referenceNormalized = pointNormalized[referenceType] |> ensureArray
            pointNormalized[referenceType] = referenceNormalized
            for (const referenceName of referenceNormalized) {
              if (!references[referenceType][referenceName]) {
                references[referenceType][referenceName] = []
              }
              references[referenceType][referenceName].push(pointNormalized)
            }
            pointNormalized.hasReferences = true
          }
          if (references[referenceType] |> hasContent) {
            if (!patch.points[categoryId].references) {
              patch.points[categoryId].references = {}
            }
            patch.points[categoryId].references[referenceType] = references[referenceType]
          }
        }
      })
    }
    return patch
  })