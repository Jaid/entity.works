import {paramCase} from "param-case"

import titleCase from "lib/titleCase"

export default survivors => survivors.map(survivor => ({
  shortTitle: survivor.id |> titleCase,
  linkId: survivor.id |> paramCase,
  ...survivor,
}))