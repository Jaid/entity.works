import {itemTypes} from "dead-by-daylight"
import {paramCase} from "param-case"

const normalizedItemTypes = {}

for (const [id, itemType] of Object.entries(itemTypes)) {
  normalizedItemTypes[id] = {
    id,
    title: itemType.title,
    linkId: paramCase(id),
  }
}

export default normalizedItemTypes