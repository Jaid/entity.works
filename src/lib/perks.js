import perks from /* aot */ "src/data/perks"
import {titleCase} from "change-case"
import survivors from "lib/survivors"

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
const perksNormalized = perks.map(perk => {
  const defaultFor = survivors.find(({id}) => id === perk.owner) ? "survivor" : "killer"
  return {
    title: perk.id |> titleCase,
    ingameId: perk.id,
    owner: false,
    level: 30,
    rarity: getRarity(perk.level),
    visible: true,
    for: defaultFor,
    ...perk,
  }
})

export default perksNormalized