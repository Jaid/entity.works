import killers from "lib/killers"
import patches from "lib/patches"
import survivors from "lib/survivors"
import perks from "lib/perks"

const meta = [
  {
    type: "killer",
    list: killers,
  },
  {
    type: "survivor",
    list: survivors,
  },
  {
    type: "perk",
    list: perks,
  },
  {
    type: "patch",
    list: patches,
    nameKey: "semver",
  },
]

/**
 * @param {string} id
 */
export default id => {
  for (const {type, list, nameKey = "id"} of meta) {
    const info = list.find(needle => needle[nameKey] === id)
    if (info) {
      return {
        type,
        info,
      }
    }
  }
}