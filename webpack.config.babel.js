import path from "path"

import configure from "webpack-config-jaid"

export default configure({
  publishimo: {fetchGithub: true},
  robots: true,
  appDescription: "An alternative Dead by Daylight wiki",
  icon: path.join(__dirname, "icon.png"),
  extra: {
    resolve: {
      alias: {
        theme$: path.resolve(__dirname, "src", "theme.scss"),
      },
    },
  },
})