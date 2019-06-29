import killers from /* aot */ "src/data/killers"
import titleCase from "title-case"
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
  shortTitle: killer.id |> titleCase,
  title: `The ${killer.shortTitle || killer.id |> titleCase}`,
  linkId: killer.id |> paramCase,
  ...killer,
}))

export default killersNormalized