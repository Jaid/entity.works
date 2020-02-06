import {paramCase} from "param-case"

import BuildKillerLoadoutForm from "components/BuildKillerLoadoutForm"

const formTypes = {
  killerLoadout: {
    title: "Killer Loadout",
    FormComponent: BuildKillerLoadoutForm,
  },
  killerTierList: {
    title: "Killer Tierlist",
    FormComponent: BuildKillerLoadoutForm,
  },
}

for (const [id, formType] of Object.entries(formTypes)) {
  formType.linkId = paramCase(id)
  formType.pageTitle = `Build a ${formType.title}`
}

export function getFormType(id) {
  return formTypes[id] || Object.values(formTypes).find(formType => formType.linkId === id)
}

export default formTypes