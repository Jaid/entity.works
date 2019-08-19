import survivors from /* aot */ "src/data/survivors"

import normalizeSurvivors from "./normalizeSurvivors"

/**
 * @typedef survivor
 * @prop {string} id
 * @prop {string} title
 * @prop {string} shortTitle
 * @prop {string} linkId
 */

/**
 * @type {survivor[]}
 */
const normalizedSurvivors = normalizeSurvivors(survivors)

export default normalizedSurvivors