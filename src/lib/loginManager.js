import socketClient from "lib/socketMiddleware"

import LoginManager from "src/packages/login-manager"

const loginManager = new LoginManager({
  socketClient,
})

export const ProfileLink = loginManager.getProfileLinkComponent()
export const LogoutLink = loginManager.getLogoutLinkComponent()

export default loginManager