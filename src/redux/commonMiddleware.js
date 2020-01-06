import loginManager from "lib/loginManager"
import {socketMiddleware} from "lib/socketMiddleware"

export default [socketMiddleware, loginManager.getMiddleware()]