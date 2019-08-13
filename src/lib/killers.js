import killers from /* aot */ "src/data/killers"

import normalizeKillers from "./normalizeKillers"

/**
 * @typedef killer
 * @prop {string} id
 * @prop {string} title
 * @prop {string} shortTitle
 * @prop {string} fullName
 * @prop {string} linkId
 * @prop {string} power
 * @prop {string} powerTitle
 */

/**
 * @type {killer[]}
 */
export default normalizeKillers(killers)