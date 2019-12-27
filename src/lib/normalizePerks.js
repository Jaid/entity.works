import {paramCase} from "param-case"

import titleCase from "lib/titleCase"

const getRarity = level => {
  if (level === 30) {
    return "rare"
  }
  if (level) {
    return "veryrare"
  }
  return "rare"
}

export default perks => perks.map(perk => {
  return {
    title: titleCase(perk.id),
    ingameId: perk.id,
    owner: false,
    level: 30,
    rarity: getRarity(perk.level),
    visible: true,
    linkId: perk.id |> paramCase,
    ...perk,
  }
})