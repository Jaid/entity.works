import deadByDaylight from "dead-by-daylight"
import {paramCase} from "param-case"

import powerEffects from /* aot */ "src/aotLoaders/powers"

class Killer {

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
   * @type {string}
   */
  powerTitle = null

  /**
   * @type {string}
   */
  powerId = null

  /**
   * @type {string}
   */
  richEffect = null

  /**
   * @param {string} id
   */
  setId(id) {
    this.id = id
    this.linkId = paramCase(id)
  }

  /**
   * @param {string} effect
   */
  setEffect(effect) {
    this.richEffect = effect
  }

}

Killer.all = Object.entries(deadByDaylight.killers).map(([id, baseKiller]) => {
  const killer = new Killer
  killer.setId(id)
  const effect = powerEffects[id]
  if (effect) {
    killer.setEffect(effect)
  }
  killer.title = baseKiller.title
  killer.shortTitle = baseKiller.shortTitle
  killer.visible = baseKiller.visible
  killer.released = baseKiller.released
  killer.powerTitle = baseKiller.powerTitle
  killer.powerId = baseKiller.powerId
  if (baseKiller.realName) {
    killer.realName = baseKiller.realName
  }
  return killer
})

Killer.allVisible = Killer.all.filter(killer => killer.visible)

Killer.find = id => {
  return Killer.all.find(killer => killer.id === id) || Killer.all.find(killer => killer.linkId === id)
}

export default Killer