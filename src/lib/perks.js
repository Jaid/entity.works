import perks from /* aot */ "src/data/perks"

import normalizePerks from "./normalizePerks"

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
export default normalizePerks(perks)