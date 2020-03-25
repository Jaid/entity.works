import deadByDaylight from "dead-by-daylight"
import {sortBy} from "lodash"
import {paramCase} from "param-case"

import perkEffects from /* aot */ "src/aotLoaders/perkEffects"

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
  visible = null

  /**
   * @type {string}
   */
  linkId = null

  /**
   * @type {string}
   */
  id = null

  /**
   * @param {string} effect
   */
  setEffect(effect) {
    this.richEffect = effect
    this.plainEffect = effect
  }

  /**
   * @param {string} id
   */
  setId(id) {
    this.id = id
    this.linkId = paramCase(id)
  }

  static sortByTitle(array) {
    return sortBy(array, "title")
  }

}

Perk.all = Object.entries(deadByDaylight.perks).map(([id, basePerk]) => {
  const perk = new Perk
  const effect = perkEffects[id]
  perk.setEffect(effect || "No effect.")
  perk.setId(id)
  perk.title = basePerk.title
  perk.visible = basePerk.visible
  perk.released = basePerk.released
  perk.rarity = basePerk.rarity
  perk.for = basePerk.for
  if (basePerk.owner) {
    perk.owner = basePerk.owner
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
  return Perk.all.find(perk => perk.id === id) || Perk.all.find(perk => perk.linkId === id)
}

export default Perk