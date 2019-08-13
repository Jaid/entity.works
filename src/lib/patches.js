import patches from /* aot */ "src/data/patches"

import normalizePatches from "./normalizePatches"


/**
 * @typedef patch
 * @property {string} semver
 * @property {number} dateMs
 * @property {string} [title]
 * @property {string} date
 * @property {object} points
 * @property {string} linkId
 */

/**
 * @type {patch[]}
 */
export default normalizePatches(patches)