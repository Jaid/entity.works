import perks from /* aot */ "src/data/perks"
import titleCase from "title-case"
import survivors from "lib/survivors"
import paramCase from "param-case"

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
 * @prop {string} linkId
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
    linkId: perk.id |> paramCase,
    ...perk,
  }
})

export default perksNormalized