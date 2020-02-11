import deadByDaylight from "dead-by-daylight"
import {paramCase} from "param-case"

import itemEffects from /* aot */ "src/aotLoaders/itemEffects"

class Item {

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
  itemType = null

  /**
   * @param {string} id
   */
  setId(id) {
    this.id = id
    this.linkId = paramCase(id)
  }

  getOverTitle() {
    return `Item`
  }

}

Item.all = Object.entries(deadByDaylight.items).map(([id, baseItem]) => {
  const item = new Item
  item.richEffect = itemEffects[id] || "No effect."
  item.setId(id)
  item.title = baseItem.title
  item.visible = baseItem.visible
  item.released = baseItem.released
  item.rarity = baseItem.rarity
  item.itemType = baseItem.type
  return item
})

Item.allVisible = Item.all.filter(item => item.visible)
Item.findByType = type => {
  return Item.all.filter(item => item.itemType === type)
}
Item.find = id => {
  return Item.all.find(item => item.id === id) || Item.all.find(item => item.linkId === id)
}

export default Item