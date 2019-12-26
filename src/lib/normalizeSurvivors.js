import {paramCase} from "param-case"
import {titleCase} from "title-case"

export default survivors => survivors.map(survivor => ({
  shortTitle: survivor.id |> titleCase,
  linkId: survivor.id |> paramCase,
  ...survivor,
}))