import deadByDaylight from "dead-by-daylight"
import {paramCase} from "param-case"

class Survivor {

  /**
   * @type {string}
   */
  title = null

  /**
   * @type {string}
   */
  shortTitle = null

  /**
   * @type {string}
   */
  linkId = null

  /**
   * @type {string}
   */
  id = null

  /**
   * @type {boolean}
   */
  visible = null

  /**
   * @type {boolean}
   */
  released = null

  /**
   * @param {string} id
   */
  setId(id) {
    this.id = id
    this.linkId = paramCase(id)
  }

}

Survivor.all = Object.entries(deadByDaylight.survivors).map(([id, baseSurvivor]) => {
  const survivor = new Survivor
  survivor.setId(id)
  survivor.title = baseSurvivor.title
  survivor.shortTitle = baseSurvivor.shortTitle
  survivor.visible = baseSurvivor.visible
  survivor.released = baseSurvivor.released
  return survivor
})

Survivor.allVisible = Survivor.all.filter(survivor => survivor.visible)

Survivor.find = id => {
  return Survivor.all.find(survivor => survivor.id === id) || Survivor.all.find(survivor => survivor.linkId === id)
}

export default Survivor