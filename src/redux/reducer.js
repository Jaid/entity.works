import immer from "immer"
import {combineReducers} from "redux"
import {reducer as formReducer} from "redux-form"
import query from "src/query"

import {socketReducer} from "./socket"

const mainReducer = (state, action) => {
  if (!state) {
    return {
      mode: query.mode,
    }
  }
  if (action.type === "@@main/newPreview") {
    return immer(state, draft => {
      draft.previews = action.payload
    })
  }
  if (action.type === "@@main/setOptions") {
    return immer(state, draft => {
      draft.options = action.payload
    })
  }
  if (action.type === "@@main/setPreset") {
    return immer(state, draft => {
      draft.selectedPreset = action.payload
    })
  }
  if (action.type === "@@main/setImage") {
    return immer(state, draft => {
      draft.selectedImage = action.payload
    })
  }
  if (action.type === "@@main/setPresetOptions") {
    return immer(state, draft => {
      draft.presetOptions = action.payload
    })
  }
  if (action.type === "@@main/imageAdded") {
    return immer(state, draft => {
      const {name, ...properties} = action.payload
      draft.options.images[name] = properties
    })
  }
  return state
}

export default combineReducers({
  main: mainReducer,
  socket: socketReducer,
  form: formReducer,
})