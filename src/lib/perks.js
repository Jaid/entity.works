import perks from /* aot */ "src/data/perks"
import {titleCase} from "change-case"

export default perks.map(perk => ({
  title: perk.id |> titleCase,
  teachable: true,
  rarity: "rare",
  visible: true,
  ...perk,
}))