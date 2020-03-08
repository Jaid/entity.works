import Patch from "lib/Patch"

/**
 * @param {Date} date
 */
export default date => {
  const time = date.getTime()
  for (const patch of Patch.all) {
    if (patch.date < time) {
      return patch
    }
  }
  return null
}