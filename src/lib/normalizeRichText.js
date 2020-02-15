import flattenMultiline from "flatten-multiline"
import splitOnFirst from "split-on-first"

import findObject from "./findObject"

/**
 * @param {string} text
 * @param {string} thisReplacement
 * @return {string}
 */
function normalizeRichText(text, thisReplacement) {
  return text.replace(/{(.+?)}/g, (token, groupToken) => {
    if (groupToken === "this") {
      return thisReplacement
    }
    const [type, content] = splitOnFirst(groupToken, ":")
    const daylightObject = findObject(content)
    if (daylightObject?.title) {
      return daylightObject.title
    }
    return content
  })
}

export const flattenRichText = (text, thisReplacement) => {
  const normalized = normalizeRichText(text, thisReplacement)
  return flattenMultiline(normalized)
}

export default normalizeRichText