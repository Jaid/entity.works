import socketClient from "lib/socketMiddleware"

import LoginManager from "src/packages/login-manager"

export default new LoginManager({
  socketClient,
})