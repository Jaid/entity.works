import perks from /* aot */ "src/data/perks"
import {titleCase} from "change-case"

export default perks.map(perk => ({
  title: perk.id |> titleCase,
  ingameId: perk.id,
  owner: false,
  level: 30,
  rarity: "rare",
  visible: true,
  ...perk,
}))