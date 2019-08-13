import titleCase from "title-case"
import paramCase from "param-case"

export default killers => killers.map(killer => ({
  shortTitle: killer.id |> titleCase,
  title: `The ${killer.shortTitle || killer.id |> titleCase}`,
  linkId: killer.id |> paramCase,
  ...killer,
}))