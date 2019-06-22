import killers from "lib/killers"
import patches from "lib/patches"
import survivors from "lib/survivors"
import perks from "lib/perks"

const objectSources = {
  killer: {
    list: killers,
  },
  survivor: {
    list: survivors,
  },
  perk: {
    list: perks,
  },
  patch: {
    list: patches,
    nameKey: "semver",
  },
}

/**
 * @param {string} type
 * @param {string} id
 */
export const findExactObject = (type, id) => {
  const objectSource = objectSources[type]
  return objectSource.list.find(needle => needle[objectSource.nameKey || "id"] === id)
}

/**
 * @param {string} id
 */
export default id => {
  for (const type of Object.keys(objectSources)) {
    const info = findExactObject(type, id)
    if (info) {
      return {
        type,
        info,
      }
    }
  }
}