import {paramCase} from "param-case"

import titleCase from "lib/titleCase"

export default killers => killers.map(killer => ({
  shortTitle: killer.id |> titleCase,
  title: `The ${killer.shortTitle || killer.id |> titleCase}`,
  linkId: killer.id |> paramCase,
  ...killer,
}))