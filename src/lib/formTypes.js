import {paramCase} from "param-case"

/**
 * @typedef {Object} Type
 * @prop {string} id
 * @prop {string} title
 * @prop {string} pluralTitle
 * @prop {string} linkid
 * @prop {string} pageTitle
 */

/**
 * @type {Type[]}
 */
const formTypes = [
  {
    id: "killerLoadout",
    title: "Killer Loadout",
  },
  {
    id: "survivorLoadout",
    title: "Survivor Loadout",
  },
  {
    id: "killerTierList",
    title: "Killer Tier List",
  },
]

for (const formType of formTypes) {
  formType.linkId = paramCase(formType.id)
  formType.pageTitle = `Build a ${formType.title}`
  formType.pluralTitle = `${formType.title}s`
}

export function getFormType(id) {
  return formTypes.find(formType => formType.id === id) || formTypes.find(formType => formType.linkId === id)
}

export default formTypes