import path from "path"

import configure from "webpack-config-jaid"
import paramCase from "param-case"

import patchesJob from "./src/data/patches"
import perksJob from "./src/data/perks"
import killersJob from "./src/data/killers"
import survivorsJob from "./src/data/survivors"

const collectUrls = async () => {
  const [patches, perks, killers, survivors] = await Promise.all([
    patchesJob(),
    perksJob(),
    killersJob(),
    survivorsJob(),
  ])
  return [
    {
      url: "perks/killer",
      priority: 0.8,
    },
    {
      url: "perks/survivor",
      priority: 0.8,
    },
    ...patches.map(patch => `patch/${patch.linkId}`),
    ...perks.map(perk => `perk/${perk.id |> paramCase}`),
    ...killers.map(killer => `killer/${killer.id |> paramCase}`),
    ...survivors.map(survivor => `survivor/${survivor.id |> paramCase}`),
  ]
}

export default configure({
  publishimo: {fetchGithub: true},
  googleAnalyticsTrackingId: "UA-51563406-7",
  robots: true,
  appDescription: "A moderately/considerably/tremendously modern Dead by Daylight wiki",
  icon: path.join(__dirname, "icon.png"),
  sitemap: {
    paths: collectUrls(),
  },
  extra: {
    resolve: {
      alias: {
        theme$: path.resolve(__dirname, "src", "theme.scss"),
      },
    },
  },
})