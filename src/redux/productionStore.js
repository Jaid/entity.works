import {applyMiddleware, compose, createStore} from "redux"
import {responsiveStoreEnhancer} from "redux-responsive"

import commonMiddleware from "./commonMiddleware"
import reducer from "./reducer"

const enhancer = applyMiddleware(...commonMiddleware)

export default createStore(reducer, compose(responsiveStoreEnhancer, enhancer))