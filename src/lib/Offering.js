import deadByDaylight from "dead-by-daylight"
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
   * @type {string}
   */
  overTitle = null

  /**
   * @type {"killer"|"survivor"}
   */
  type = null

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
  offering.type = baseOffering.type
  if (offering.type === "survivor") {
    offering.overTitle = "Survivor Offering"
  } else if (offering.type === "killer") {
    offering.overTitle = "Killer Offering"
  } else {
    offering.overTitle = "Offering"
  }
  return offering
})

Offering.allVisible = Offering.all.filter(offering => offering.visible)
Offering.forKiller = Offering.allVisible.filter(offering => offering.type !== "survivor")
Offering.forSurvivor = Offering.allVisible.filter(offering => offering.type !== "killer")
Offering.forKillerExclusive = Offering.allVisible.filter(offering => offering.type === "killer")
Offering.forSurvivorExclusive = Offering.allVisible.filter(offering => offering.type === "survivor")
Offering.find = id => {
  return Offering.all.find(offering => offering.id === id) || Offering.all.find(offering => offering.linkId === id)
}

export default Offering