import {paramCase} from "param-case"
import {titleCase} from "title-case"

export default killers => killers.map(killer => ({
  shortTitle: killer.id |> titleCase,
  title: `The ${killer.shortTitle || killer.id |> titleCase}`,
  linkId: killer.id |> paramCase,
  ...killer,
}))