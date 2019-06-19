
import {Howl} from "howler"

const startingRenderSound = new Howl({
  src: require("src/sounds/startingRender.ogg"),
  volume: 0.02,
})

const renderSound = new Howl({
  src: require("src/sounds/updatePreviews.ogg"),
  volume: 0.05,
})

const exportFinishedSound = new Howl({
  src: require("src/sounds/exportFinished.ogg"),
  volume: 0.1,
})

export default store => next => action => {
  const {main} = store.getState()
  if (main.mode === "user") {
    if (action.type === "@@sound/play/startingRender") {
      startingRenderSound.play()
    }
    if (action.type === "@@sound/play/exportFinished") {
      exportFinishedSound.play()
    }
    if (action.type === "@@sound/play/render") {
      renderSound.play()
    }
  }
  return next(action)
}