import path from "path"
import {EnvironmentPlugin} from "webpack"
import configure from "webpack-config-jaid"

export default configure({
  googleAnalyticsTrackingId: "UA-154709538-3",
  themeColor: "8b1b9d",
  twitterAuthorHandle: "jaidchen",
  extra: {
    resolve: {
      alias: {
        theme$: path.resolve(__dirname, "src", "theme.scss"),
      },
    },
    plugins: [
      new EnvironmentPlugin({
        backendHost: "server.entity.works",
      }),
    ],
  },
})