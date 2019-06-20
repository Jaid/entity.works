import path from "path"

import configure from "webpack-config-jaid"

export default configure({
  publishimo: {fetchGithub: true},
  optimizeCss: true,
  createCssFile: true,
  robots: true,
  domain: "entity.works",
  configOutput: true,
  extra: {
    resolve: {
      alias: {
        theme$: path.resolve(__dirname, "src", "theme.scss"),
      },
    },
  },
})