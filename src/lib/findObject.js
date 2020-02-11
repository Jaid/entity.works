import AddOn from "lib/AddOn"
import Item from "lib/Item"
import Killer from "lib/Killer"
import Patch from "lib/Patch"
import Perk from "lib/Perk"
import Survivor from "lib/Survivor"

import Offering from "./Offering"

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
 * @prop {string} realName
 * @prop {string} linkId
 * @prop {string} power
 * @prop {string} powerTitle
 * @typedef {DaylightObject & KillerInterface} Killer
 *
 * @typedef {Object} PatchInterface
 * @prop {string} semver
 * @prop {number} date
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
for (const perk of Perk.all) {
  perksObject[perk.id] = perk
  index[perk.id] = {
    ...perk,
    type: "perk",
  }
}

const killersObject = {}
for (const killer of Killer.allVisible) {
  killersObject[killer.id] = killer
  index[killer.id] = {
    ...killer,
    type: "killer",
  }
}

const survivorsObject = {}
for (const survivor of Survivor.allVisible) {
  survivorsObject[survivor.id] = survivor
  index[survivor.id] = {
    ...survivor,
    type: "survivor",
  }
}

const patchesObject = {}
for (const patch of Patch.all) {
  patchesObject[patch.id] = patch
  index[patch.id] = {
    ...patch,
    type: "patch",
  }
}

const addOnsObject = {}
for (const addOn of AddOn.all) {
  addOnsObject[addOn.id] = addOn
  index[addOn.id] = {
    ...addOn,
    type: "addOn",
  }
}

const offeringsObject = {}
for (const addOn of Offering.all) {
  offeringsObject[addOn.id] = addOn
  index[addOn.id] = {
    ...addOn,
    type: "offering",
  }
}

const itemsObject = {}
for (const item of Item.all) {
  itemsObject[item.id] = item
  index[item.id] = {
    ...item,
    type: "item",
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

console.debug("Objects: ", index)
export {index}

/**
 * @param {string} id
 * @return {AnyDaylightObject}
 */
export default id => {
  const foundObjectById = index[id]
  if (foundObjectById) {
    return foundObjectById
  }
  for (const object of Object.values(index)) {
    if (!object.linkId) {
      continue
    }
    if (object.linkId === id) {
      return object
    }
  }
  return null
}