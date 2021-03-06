import deadByDaylight from "dead-by-daylight"
import filterNil from "filter-nil"
import {paramCase} from "param-case"
import path from "path"
import {EnvironmentPlugin} from "webpack"
import configure from "webpack-config-jaid"

import itemTypes from "lib/itemTypes"

import pkg from "./package.json"
import formTypes from "./src/lib/formTypes"

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
    "objects",
    "about",
    "perks/all",
    "build",
    "offerings/all",
    "offerings/killer",
    "offerings/survivor",
    "offerings/killer-exclusive",
    "offerings/survivor-exclusive",
    ...Object.keys(deadByDaylight.addOns).map(id => `add-on/${paramCase(id)}`),
    ...Object.keys(deadByDaylight.perks).map(id => `perk/${paramCase(id)}`),
    ...Object.keys(deadByDaylight.perks).map(id => `patches/for/${paramCase(id)}`),
    ...Object.keys(deadByDaylight.killers).map(id => `killer/${paramCase(id)}`),
    ...Object.keys(deadByDaylight.killers).map(id => `patches/for/${paramCase(id)}`),
    ...Object.keys(deadByDaylight.survivors).map(id => `survivor/${paramCase(id)}`),
    ...Object.keys(deadByDaylight.survivors).map(id => `patches/for/${paramCase(id)}`),
    ...Object.keys(deadByDaylight.patches).map(id => `patch/${paramCase(id)}`),
    ...Object.keys(deadByDaylight.offerings).map(id => `offering/${paramCase(id)}`),
    ...Object.keys(deadByDaylight.items).map(id => `item/${paramCase(id)}`),
    ...itemTypes.map(itemType => `items/${itemType.linkId}`),
    ...formTypes.map(formType => `build/${formType.linkId}`),
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
  twitterSiteHandle: "entitydotworks",
  extra: {
    resolve: {
      alias: {
        theme$: path.resolve(__dirname, "src", "theme.scss"),
      },
    },
    plugins: [
      new EnvironmentPlugin({
        backendHost: "wss://server.entity.works",
        version: pkg.version,
      }),
    ],
  },
})