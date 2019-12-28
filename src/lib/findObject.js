import killers from "lib/killers"
import patches from "lib/patches"
import perks from "lib/perks"
import survivors from "lib/survivors"

/**
 * @typedef {Object} DaylightObject
 * @prop {string} id
 * @prop {string} title
 *
 * @typedef {Object} AnyDaylightObjectInterface
 * @prop {string} type
 *
 * @typedef {DaylightObject & AnyDaylightObjectInterface} AnyDaylightObject
 *
 * @typedef {Object} PerkInterface
 * @prop {string} id
 * @prop {string} ingameId
 * @prop {string|boolean} owner
 * @prop {number} level
 * @prop {string} rarity
 * @prop {boolean} visible
 * @prop {string} linkId
 *
 * @typedef {DaylightObject & PerkInterface} Perk
 *
 * @typedef {Object} SurvivorInterface
 * @prop {string} shortTitle
 * @prop {string} linkId
 *
 * @typedef {DaylightObject & SurvivorInterface} Survivor
 *
 * @typedef {Object} KillerInterface
 * @prop {string} shortTitle
 * @prop {string} fullName
 * @prop {string} linkId
 * @prop {string} power
 * @prop {string} powerTitle
 * @typedef {DaylightObject & KillerInterface} Killer
 *
 * @typedef {Object} PatchInterface
 * @prop {string} semver
 * @prop {number} dateMs
 * @prop {string} title
 * @prop {string} date
 * @prop {object} points
 * @prop {string} linkId
 *
 * @typedef {DaylightObject & PatchInterface} Patch
 */

const perksObject = perks.reduce((base, current) => {
  base[current.id] = current
  return base
}, {})

const survivorsObject = survivors.reduce((base, survivor) => {
  base[survivor.id] = survivor
  return base
}, {})

const killersObject = killers.reduce((base, killer) => {
  base[killer.id] = killer
  return base
}, {})

const patchesObject = patches.reduce((base, patch) => {
  base[patch.semver] = patch
  return base
}, {})

/**
 * @param {string} id
 * @return {Perk}
 */
export const findPerk = id => {
  return perksObject[id]
}

/**
 * @param {string} id
 * @return {Survivor}
 */
export const findSurvivor = id => {
  return survivorsObject[id]
}

/**
 * @param {string} id
 * @return {Killer}
 */
export const findKiller = id => {
  return killersObject[id]
}

/**
 * @param {string} semver
 * @return {Patch}
 */
export const findPatch = semver => {
  return patchesObject[semver]
}

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
 * @return {AnyDaylightObject}
 */
export default id => {
  for (const type of Object.keys(objectSources)) {
    const info = findExactObject(type, id)
    if (info) {
      return {
        type,
        ...info,
      }
    }
  }
  return null
}