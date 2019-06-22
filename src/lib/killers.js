import killers from /* aot */ "src/data/killers"
import {capitalize} from "lodash"

/**
 * @typedef killer
 * @prop {string} id
 * @prop {string} title
 */

/**
 * @type {killer[]}
 */
const killersNormalized = killers.map(killer => ({
  title: `The ${killer.id |> capitalize}`,
  ...killer,
}))

export default killersNormalized