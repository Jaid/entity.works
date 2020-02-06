import {paramCase} from "param-case"

const formTypes = [
  {
    id: "killerLoadout",
    title: "Killer Loadout",
  },
  {
    id: "killerTierList",
    title: "Killer Tierlist",
  },
]

for (const formType of formTypes) {
  formType.linkId = paramCase(formType.id)
  formType.pageTitle = `Build a ${formType.title}`
}

export function getFormType(id) {
  return formTypes.find(formType => formType.id === id) || formTypes.find(formType => formType.linkId === id)
}

export default formTypes