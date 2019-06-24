import killers from /* aot */ "src/data/killers"
import {capitalize} from "lodash"

/**
 * @typedef killer
 * @prop {string} id
 * @prop {string} title
 * @prop {string} shortTitle
 * @prop {string} fullName
 */

/**
 * @type {killer[]}
 */
const killersNormalized = killers.map(killer => ({
  shortTitle: killer.id |> capitalize,
  title: `The ${killer.shortTitle || killer.id |> capitalize}`,
  ...killer,
}))

export default killersNormalized