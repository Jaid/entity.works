import deadByDaylight from "dead-by-daylight"
import filterNil from "filter-nil"
import {paramCase} from "param-case"
import path from "path"
import {EnvironmentPlugin} from "webpack"
import configure from "webpack-config-jaid"

const development = process.env.NODE_ENV !== "production"

const collectUrls = () => {
  const urls = [
    {
      url: "perks/killer",
      priority: 0.8,
    },
    {
      url: "perks/survivor",
      priority: 0.8,
    },
    {
      url: "characters",
      priority: 0.8,
    },
    "data",
    "perks/all",
    ...Object.keys(deadByDaylight.addOns).map(id => `add-on/${paramCase(id)}`),
    ...Object.keys(deadByDaylight.perks).map(id => `perk/${paramCase(id)}`),
    ...Object.keys(deadByDaylight.killers).map(id => `killer/${paramCase(id)}`),
    ...Object.keys(deadByDaylight.survivors).map(id => `survivor/${paramCase(id)}`),
    ...Object.keys(deadByDaylight.patches).map(patch => `add-on/${paramCase(patch.id)}`),
  ]
  return filterNil(urls)
}

export default configure({
  sitemap: {
    paths: development ? null : collectUrls(),
  },
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