import {isFunction, mapValues} from "lodash"

export default (namespace, actionMap) => mapValues(actionMap, (value, key) => {
  const type = `@@${namespace}/${key}`
  if (value |> isFunction) {
    return payload => ({
      payload: value(payload),
      type,
    })
  }
  return payload => ({
    type,
    payload,
  })
})