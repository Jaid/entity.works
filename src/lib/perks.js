import perks from /* aot */ "src/data/perks"
import {titleCase} from "change-case"

const getRarity = level => {
  if (level === 30) {
    return "rare"
  }
  if (level) {
    return "veryrare"
  }
  return "rare"
}

/**
 * @typedef perk
 * @prop {string} id
 * @prop {string} title
 * @prop {string} ingameId
 * @prop {string|boolean} owner
 * @prop {number} level
 * @prop {string} rarity
 * @prop {boolean} visible
 */

/**
 * @type {perk[]}
 */
const perksNormalized = perks.map(perk => ({
  title: perk.id |> titleCase,
  ingameId: perk.id,
  owner: false,
  level: 30,
  rarity: getRarity(perk.level),
  visible: true,
  ...perk,
}))

export default perksNormalized