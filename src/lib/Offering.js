import deadByDaylight from "dead-by-daylight"
import {sortBy} from "lodash"
import {paramCase} from "param-case"

import offeringEffects from /* aot */ "src/aotLoaders/offeringEffects"

class Offering {

  /**
   * @type {string}
   */
  richEffect = null

  /**
   * @type {string}
   */
  title = null

  /**
   * @type {string}
   */
  rarity = null

  /**
   * @type {string}
   */
  linkId = null

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
   * @type {"killer"|"survivor"}
   */
  for = null

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

}

Offering.all = Object.entries(deadByDaylight.offerings).map(([id, baseOffering]) => {
  const offering = new Offering
  const effect = offeringEffects[id]
  offering.setEffect(effect || "No effect.")
  offering.setId(id)
  offering.title = baseOffering.title
  offering.visible = baseOffering.visible
  offering.released = baseOffering.released
  offering.rarity = baseOffering.rarity
  offering.for = baseOffering.for
  return offering
})

Offering.allVisible = Offering.all.filter(offering => offering.visible)
Offering.forKiller = Offering.allVisible.filter(offering => offering.for === "killer")
Offering.forSurvivor = Offering.allVisible.filter(offering => offering.for === "survivor")
Offering.find = id => {
  return Offering.all.find(offering => offering.id === id) || Offering.all.find(offering => offering.linkId === id)
}

export default Offering