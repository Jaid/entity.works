import survivors from /* aot */ "src/data/survivors"
import {capitalize} from "lodash"

/**
 * @typedef survivor
 * @prop {string} id
 * @prop {string} title
 * @prop {string} shortTitle
 */

/**
 * @type {survivor[]}
 */
const survivorsNormalized = survivors.map(survivor => ({
  shortTitle: survivor.id |> capitalize,
  ...survivor,
}))

export default survivorsNormalized