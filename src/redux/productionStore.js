import {applyMiddleware, createStore} from "redux"

import commonMiddleware from "./commonMiddleware"
import reducer from "./reducer"

const enhancer = applyMiddleware(...commonMiddleware)

export default createStore(reducer, enhancer)