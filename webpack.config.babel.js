import path from "path"

import configure from "webpack-config-jaid"

export default configure({
  publishimo: {fetchGithub: true},
  robots: true,
  appDescription: "A moderately/considerably/tremendously modern Dead by Daylight wiki",
  icon: path.join(__dirname, "icon.png"),
  extra: {
    resolve: {
      alias: {
        theme$: path.resolve(__dirname, "src", "theme.scss"),
      },
    },
  },
})