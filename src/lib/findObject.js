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

/**
  * @type {Object<string, DaylightObject>}
  */
const index = {}

const perksObject = {}
for (const perk of perks) {
  perksObject[perk.id] = perk
  index[perk.id] = {
    ...perk,
    type: "perk",
  }
}

const killersObject = {}
for (const killer of killers) {
  killersObject[killer.id] = killer
  index[killer.id] = {
    ...killer,
    type: "killer",
  }
}

const survivorsObject = {}
for (const survivor of survivors) {
  survivorsObject[survivor.id] = survivor
  index[survivor.id] = {
    ...survivor,
    type: "survivor",
  }
}

const patchesObject = {}
for (const patch of patches) {
  patchesObject[patch.id] = patch
  index[patch.id] = {
    ...patch,
    type: "patch",
  }
}

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

if (process.env.NODE_ENV !== "production") {
  console.log("Objects: ", index)
}

export {index}

/**
 * @param {string} id
 * @return {AnyDaylightObject}
 */
export default id => {
  return index[id]
}