import survivors from /* aot */ "src/data/survivors"
import {capitalize} from "lodash"
import paramCase from "param-case"

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
const survivorsNormalized = survivors.map(survivor => ({
  shortTitle: survivor.id |> capitalize,
  linkId: survivor.id |> paramCase,
  ...survivor,
}))

export default survivorsNormalized