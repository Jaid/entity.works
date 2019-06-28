import killers from /* aot */ "src/data/killers"
import {capitalize} from "lodash"
import paramCase from "param-case"

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
const killersNormalized = killers.map(killer => ({
  shortTitle: killer.id |> capitalize,
  title: `The ${killer.shortTitle || killer.id |> capitalize}`,
  linkId: killer.id |> paramCase,
  ...killer,
}))

export default killersNormalized