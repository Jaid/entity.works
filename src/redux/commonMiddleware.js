import loginManager from "lib/loginManager"
import {socketMiddleware} from "lib/socketMiddleware"
import toastMiddleware from "lib/toastMiddleware"

export default [socketMiddleware, toastMiddleware, loginManager.getMiddleware()]