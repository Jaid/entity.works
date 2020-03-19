import ensureObject from "ensure-object"
import {toast} from "react-toastify"

/**
 * @type {import("redux").Middleware}
 */
export default () => {
  return next => action => {
    if (action.type === "@@toast/make" || action.type === "@@socket/received/toast") {
      const payload = ensureObject(action.payload, "content")
      const {content, ...toastOptions} = payload
      toast(content, toastOptions)
    }
    return next(action)
  }
}