import fsp from "@absolunet/fsp"
import chalk from "chalk"
import cheerio from "cheerio-util"
import deadByDaylight from "dead-by-daylight"
import got from "got"
import path from "path"
import yargs from "yargs"

function normalizeStringId(string) {
  return string.replace(/[^a-z]/gi, "").toLowerCase()
}

const categories = {
  perks: {
    url: "Perks",
    getData(html) {
      const perkTitleCorrections = {
        "Barbecue & Chilli": "Barbecue & Chili",
      }
      const dom = cheerio.load(html)
      const perkTables = dom("table.sortable").toArray()
      const fetchedPerks = {}
      for (const perkTable of perkTables) {
        const trs = dom("tr", perkTable).toArray()
        for (const tr of trs) {
          const titleTd = dom(">*:nth-child(2)", tr)
          const descriptionTd = dom(">*:nth-child(3)", tr)
          if (!titleTd.length || !descriptionTd.length) {
            continue
          }
          const title = dom.text(titleTd).trim()
          const titleNormalized = normalizeStringId(perkTitleCorrections[title] || title)
          const matchingPerk = Object.values(deadByDaylight.perks).find(perk => {
            const matchNormalized = normalizeStringId(perk.title)
            return matchNormalized === titleNormalized
          })
          if (!matchingPerk) {
            continue
          }
          fetchedPerks[matchingPerk.id] = dom.text(descriptionTd).trim()
        }
      }
      for (const perk of Object.values(deadByDaylight.perks)) {
        if (!fetchedPerks[perk.id]) {
          console.log(chalk.yellow(`In dead-by-daylight, but not on Gamepedia: ${perk.title}`))
        }
      }
      return fetchedPerks
    },
  },
}

async function job() {
  const outputFolder = path.resolve(__dirname, "..", "dist", "gamepedia")
  const gamepediaGot = got.extend({
    prefixUrl: "https://deadbydaylight.gamepedia.com",
  })
  const jobs = Object.entries(categories).map(async ([id, properties]) => {
    const result = await gamepediaGot(properties.url)
    const html = result.body
    const htmlFile = path.join(outputFolder, id, "page.html")
    const data = properties.getData(html)
    const dataFile = path.join(outputFolder, id, "data.yml")
    const writeJobs = [
      fsp.outputFile(htmlFile, html),
      fsp.outputYaml(dataFile, data),
    ]
    await Promise.all(writeJobs)
  })
  await Promise.all(jobs)
}

yargs
  .command("$0", "", {}, job).argv