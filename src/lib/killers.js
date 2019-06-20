import killers from /* aot */ "src/data/killers"
import {capitalize} from "lodash"

export default killers.map(killer => ({
  title: `The ${killer.id |> capitalize}`,
  ...killer,
}))