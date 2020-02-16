import {isEmpty} from "has-content"
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
    validate(values) {
      const errors = {}
      if (isEmpty(values.title)) {
        errors.title = "Empty"
      }
      return errors
    },
  },
  {
    id: "survivorLoadout",
    title: "Survivor Loadout",
    validate(values) {
      const errors = {}
      if (isEmpty(values.title)) {
        errors.title = "Empty"
      }
      return errors
    },
  },
  {
    id: "killerTierList",
    title: "Killer Tier List",
    validate(values) {
      const errors = {}
      if (isEmpty(values.title)) {
        errors.title = "Empty"
      }
      return errors
    },
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