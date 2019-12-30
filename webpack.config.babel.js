import {camelCase} from "camel-case"
import filterNil from "filter-nil"
import {paramCase} from "param-case"
import path from "path"
import configure from "webpack-config-jaid"

import killersJob from "./src/data/killers"
import patchesJob from "./src/data/patches"
import perksJob from "./src/data/perks"
import survivorsJob from "./src/data/survivors"
import normalizeKillers from "./src/lib/normalizeKillers"
import normalizePatches from "./src/lib/normalizePatches"
import normalizePerks from "./src/lib/normalizePerks"
import normalizeSurvivors from "./src/lib/normalizeSurvivors"

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
    ...killers.map(killer => killer.fullName ? `killer/${killer.fullName |> paramCase}` : null),
    ...killers.map(killer => killer.fullName ? `killer/${killer.fullName |> camelCase}` : null),
    ...survivors.map(survivor => `survivor/${survivor.id |> paramCase}`),
    ...survivors.map(survivor => `survivor/${survivor.title |> paramCase}`),
    ...survivors.map(survivor => `survivor/${survivor.title |> camelCase}`),
    ...survivors.map(survivor => `survivor/${survivor.shortTitle |> paramCase}`),
    ...survivors.map(survivor => `survivor/${survivor.shortTitle |> camelCase}`),
  ]
  return filterNil(urls)
}

const development = process.env.NODE_ENV !== "production"

export default configure({
  googleAnalyticsTrackingId: "UA-154709538-3",
  themeColor: "8b1b9d",
  twitterAuthorHandle: "jaidchen",
  sitemap: {
    paths: development ? null : collectUrls(),
  },
  extra: {
    resolve: {
      alias: {
        theme$: path.resolve(__dirname, "src", "theme.scss"),
      },
    },
  },
})