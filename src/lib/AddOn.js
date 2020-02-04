import deadByDaylight from "dead-by-daylight"
import {sortBy} from "lodash"
import {paramCase} from "param-case"

import findObject from "lib/findObject"

import addOnEffects from /* aot */ "src/aotLoaders/addOnEffects"

import Killer from "./Killer"

class AddOn {

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
   * @type {string}
   */
  for = null

  /**
   * @type {("power"|"item")}
   */
  forType = null

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

  getOwner() {
    return findObject(this.for)
  }

  isForPower() {
    return this.forType === "power"
  }

  isForItem() {
    return this.forType === "item"
  }

  getForTitle() {
    if (this.isForItem()) {
      return `${this.for} Add-On`
    }
    const killer = Killer.find(this.for)
    return killer.shortTitle || killer.title
  }

  getOverTitle() {
    return `${this.getForTitle()} Add-On`
  }

}

AddOn.all = Object.entries(deadByDaylight.addOns).map(([id, baseAddOn]) => {
  const addOn = new AddOn
  const effect = addOnEffects[id]
  if (!effect) {
    console.log(id)
  }
  addOn.setEffect(effect || "No effect.")
  addOn.setId(id)
  addOn.title = baseAddOn.title
  addOn.visible = baseAddOn.visible
  addOn.released = baseAddOn.released
  addOn.rarity = baseAddOn.rarity
  addOn.for = baseAddOn.for
  addOn.forType = baseAddOn.forType
  if (baseAddOn.owner) {
    addOn.owner = baseAddOn.owner
  }
  return addOn
})

AddOn.allVisible = AddOn.all.filter(addOn => addOn.visible)
AddOn.forKiller = AddOn.allVisible.filter(addOn => addOn.isForPower())
AddOn.forItem = AddOn.allVisible.filter(addOn => addOn.isForItem())
AddOn.findByOwner = ownerId => {
  const filteredAddOns = AddOn.all.filter(addOn => addOn.for === ownerId)
  const sortedAddOns = sortBy(filteredAddOns, "level")
  return sortedAddOns
}
AddOn.find = id => {
  return AddOn.all.find(addOn => addOn.id === id) || AddOn.all.find(addOn => addOn.linkId === id)
}

export default AddOn