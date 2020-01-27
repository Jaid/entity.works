import deadByDaylight from "dead-by-daylight"
import {sortBy} from "lodash"

import perkEffects from /* aot */ "src/aotLoaders/perkEffects"

// import Survivor from "./Survivor"

/**
 * @typedef Perk
 * @prop {string} id
 * @prop {string} title
 * @prop {string} ingameId
 * @prop {string|boolean} owner
 * @prop {number} level
 * @prop {string} rarity
 * @prop {boolean} visible
 * @prop {string} linkId
 */

class Perk {

  /**
   * @type {string}
   */
  plainEffect = null

  /**
   * @type {string}
   */
  richEffect = null

  /**
   * @type {string}
   */
  title = null

  /**
   * @type {number}
   */
  level = null

  /**
   * @type {string}
   */
  rarity = null

  /**
   * @type {string}
   */
  linkId = null

  /**
   * @type {string}
   */
  owner = null

  /**
   * @type {boolean}
   */
  visible = false

  /**
   * @param {string} effect
   */
  setEffect(effect) {
    this.richEffect = effect
  }

}

Perk.all = Object.entries(deadByDaylight.perks).map(([id, basePerk]) => {
  const perk = new Perk
  const effect = perkEffects[id]
  perk.setEffect(effect || "No effect.")
  perk.id = id
  console.log(basePerk)
  perk.title = basePerk.title
  perk.visible = basePerk.visible
  perk.released = basePerk.released
  perk.rarity = basePerk.rarity
  if (basePerk.owner) {
    perk.owner = basePerk.owner
    perk.for = basePerk.for
  } else {
    perk.for = basePerk.for
  }
  if (basePerk.level) {
    perk.level = basePerk.level
  }
  return perk
})

Perk.allVisible = Perk.all.filter(perk => perk.visible)
Perk.forKiller = Perk.allVisible.filter(perk => perk.for === "killer")
Perk.forSurvivor = Perk.allVisible.filter(perk => perk.for === "survivor")
Perk.findByOwner = ownerId => {
  const filteredPerks = Perk.all.filter(({owner}) => owner === ownerId)
  const sortedPerks = sortBy(filteredPerks, "level")
  return sortedPerks
}
Perk.find = id => {
  return Perk.all.find(perk => perk.id === id) || null
}

export default Perk