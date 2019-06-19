import socketIoClient from "socket.io-client"
import immer from "immer"
import {pick} from "lodash"
import mainActions from "mainActions"
import query from "src/query"

const port = 40666
const sendPrefix = "@@socket/send/"
// const receivePrefix = "@@socket/received/"
const connectEvent = "@@socket/connected"

const socketClient = socketIoClient(`ws://localhost:${port}`, {
  query: {
    mode: query.mode,
  },
})

const mapDispatchToSocket = dispatch => ({
  hey: payload => {
    dispatch(mainActions.setOptions(payload))
  },
  newPreview: payload => {
    dispatch(mainActions.newPreview(payload))
  },
  startingRender: () => dispatch({
    type: "@@sound/play/startingRender",
  }),
  exportFinished: () => dispatch({
    type: "@@sound/play/exportFinished",
  }),
  imageAdded: payload => {
    dispatch(mainActions.imageAdded(payload))
  },
})

export const socketReducer = (state, action) => {
  if (!state) {
    return {
      status: "unset",
    }
  }
  if (!action?.type.startsWith("@@socket/")) {
    return state
  }
  const actionType = action.type.substring("@@socket/".length)
  if (actionType === "connected") {
    return immer(state, draft => {
      draft.status = "connected"
    })
  }
  return state
}

export default store => {
  socketClient.on("connect", () => {
    store.dispatch({
      type: connectEvent,
    })
  })
  socketClient.once("connect", () => {
    store.dispatch({
      type: connectEvent,
    })
    for (const [eventName, eventHandler] of mapDispatchToSocket(store.dispatch) |> Object.entries) {
      socketClient.on(eventName, eventHandler)
    }
  })
  return next => action => {
    if (action.type.startsWith(sendPrefix)) {
      const eventName = action.type.substring(sendPrefix.length)
      socketClient.emit(eventName, action.payload)
    }
    return next(action)
  }
}