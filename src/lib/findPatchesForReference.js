import Patch from "lib/Patch"

export default id => {
  const filteredPatches = {}
  for (const patch of Patch.all) {
    for (const [categoryName, {points, references}] of Object.entries(patch.points)) {
      if (references[id]) {
        if (!filteredPatches[patch.id]) {
          filteredPatches[patch.id] = {
            ...patch,
            points: {},
          }
        }
        const filteredPoints = points.filter(point => {
          const pointReferences = point.for || []
          return pointReferences.includes(id)
        })
        filteredPatches[patch.id].points[categoryName] = filteredPoints
      }
    }
  }
  return filteredPatches
}