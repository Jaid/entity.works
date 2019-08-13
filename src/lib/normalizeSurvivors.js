import titleCase from "title-case"
import paramCase from "param-case"

export default survivors => survivors.map(survivor => ({
  shortTitle: survivor.id |> titleCase,
  linkId: survivor.id |> paramCase,
  ...survivor,
}))