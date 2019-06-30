import path from "path"

import configure from "webpack-config-jaid"
import ShellPlugin from "webpack-shell-plugin-next"

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
  extraProduction: {
    plugins: [
      new ShellPlugin({
        onBuildExit: {
          scripts: ["node --require @babel/register buildSitemap"],
        },
      }),
    ],
  },
})