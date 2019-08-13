import path from "path"

import configure from "webpack-config-jaid"
import paramCase from "param-case"
import camelCase from "camel-case"

import patchesJob from "./src/data/patches"
import perksJob from "./src/data/perks"
import killersJob from "./src/data/killers"
import survivorsJob from "./src/data/survivors"
import normalizeKillers from "./src/lib/normalizeKillers"
import normalizeSurvivors from "./src/lib/normalizeSurvivors"
import normalizePerks from "./src/lib/normalizePerks"
import normalizePatches from "./src/lib/normalizePatches"

const getPatches = async () => {
  const patches = await patchesJob()
  return normalizePatches(patches)
}

const getPerks = async () => {
  const perks = await perksJob()
  return normalizePerks(perks)
}

const getKillers = async () => {
  const killers = await killersJob()
  return normalizeKillers(killers)
}

const getSurvivors = async () => {
  const survivors = await survivorsJob()
  return normalizeSurvivors(survivors)
}

const collectUrls = async () => {
  const [patches, perks, killers, survivors] = await Promise.all([
    getPatches(),
    getPerks(),
    getKillers(),
    getSurvivors(),
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
    ...patches.map(patch => `patch/${patch.semver}`),
    ...perks.map(perk => `perk/${perk.id |> paramCase}`),
    ...perks.map(perk => `perk/${perk.title |> paramCase}`),
    ...perks.map(perk => `perk/${perk.title |> camelCase}`),
    ...perks.map(perk => `perk/${perk.ingameId |> paramCase}`),
    ...perks.map(perk => `perk/${perk.ingameId |> camelCase}`),
    ...killers.map(killer => `killer/${killer.linkId}`),
    ...killers.map(killer => `killer/${killer.shortTitle |> paramCase}`),
    ...killers.map(killer => `killer/${killer.shortTitle |> camelCase}`),
    ...killers.map(killer => `killer/${killer.title |> paramCase}`),
    ...killers.map(killer => `killer/${killer.title |> camelCase}`),
    ...killers.map(killer => `killer/${killer.fullName |> paramCase}`),
    ...killers.map(killer => `killer/${killer.fullName |> camelCase}`),
    ...survivors.map(survivor => `survivor/${survivor.id |> paramCase}`),
    ...survivors.map(survivor => `survivor/${survivor.title |> paramCase}`),
    ...survivors.map(survivor => `survivor/${survivor.title |> camelCase}`),
    ...survivors.map(survivor => `survivor/${survivor.shortTitle |> paramCase}`),
    ...survivors.map(survivor => `survivor/${survivor.shortTitle |> camelCase}`),
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