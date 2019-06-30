import fsp from "@absolunet/fsp"
import sitemapGenerator from "sitemap"
import paramCase from "param-case"

import patchesJob from "./src/data/patches"
import perksJob from "./src/data/perks"
import killersJob from "./src/data/killers"
import survivorsJob from "./src/data/survivors"

const lastmodISO = new Date().toISOString()

const job = async () => {
  const [patches, perks, killers, survivors] = await Promise.all([
    patchesJob(),
    perksJob(),
    killersJob(),
    survivorsJob(),
  ])
  const urls = [
    "",
    "perks/killer",
    "perks/survivor",
    ...patches.map(patch => `/patch/${patch.linkId}`),
    ...perks.map(perk => `/perk/${perk.id |> paramCase}`),
    ...killers.map(killer => `/killer/${killer.id |> paramCase}`),
    ...survivors.map(survivor => `/survivor/${survivor.id |> paramCase}`),
  ]
  const sitemap = sitemapGenerator.createSitemap({
    hostname: `https://${_PKG_DOMAIN}`,
    cacheTime: 0,
    urls: urls.map(url => ({
      url,
      lastmodISO,
      changefreq: "hourly",
    })),
  })
  await fsp.outputFile(`dist/package/${process.env.NODE_ENV}/sitemap.xml`, sitemap.toString(), "utf8")
}

job()