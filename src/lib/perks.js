import perks from /* aot */ "src/data/perks"

import survivors from "./survivors"
import normalizePerks from "./normalizePerks"
import {sortBy} from "lodash"

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
const normalizedPerks = normalizePerks(perks).map(perk => {
  let forValue
  if (survivors.find(survivor => survivor.id === perk.owner)) {
    forValue = "survivor"
  } else {
    forValue = "killer"
  }
  return {
    for: forValue,
    ...perk,
  }
})

export const killerPerks = normalizedPerks.filter(perk => perk.for === "killer")
export const survivorPerks = normalizedPerks.filter(perk => perk.for === "survivor")
export const perksByOwner = ownerId => normalizedPerks |> #.filter(({owner}) => owner === ownerId) |> sortBy(#, "level")

export default normalizedPerks