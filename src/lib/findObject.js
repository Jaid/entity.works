import killers from "lib/killers"
import patches from "lib/patches"
import perks from "lib/perks"
import survivors from "lib/survivors"

/**
 * @typedef {Object} DaylightObject
 * @prop {string} type
 * @prop {string} id
 * @prop {string} title
 */

/**
 * @typedef Perk
 * @extends DaylightObject
 * @prop {string} id
 * @prop {string} ingameId
 * @prop {string|boolean} owner
 * @prop {number} level
 * @prop {string} rarity
 * @prop {boolean} visible
 * @prop {string} linkId
 */

/**
 * @typedef Survivor
 * @extends DaylightObject
 * @prop {string} shortTitle
 * @prop {string} linkId
 */

/**
 * @typedef Killer
 * @prop {string} shortTitle
 * @prop {string} fullName
 * @prop {string} linkId
 * @prop {string} power
 * @prop {string} powerTitle
 */

/**
 * @typedef Patch
 * @extends DaylightObject
 * @property {string} semver
 * @property {number} dateMs
 * @property {string} title
 * @property {string} date
 * @property {object} points
 * @property {string} linkId
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
 * @type {string} id
 * @return {Perk}
 */
export const findPerk = id => {
  return perksObject[id]
}

/**
 * @type {string} id
 * @return {Survivor}
 */
export const findSurvivor = id => {
  return survivorsObject[id]
}

/**
 * @type {string} id
 * @return {Killer}
 */
export const findKiller = id => {
  return killersObject[id]
}

/**
 * @type {string} semver
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
 * @return {DaylightObject}
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