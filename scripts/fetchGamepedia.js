import fsp from "@absolunet/fsp"
import chalk from "chalk"
import cheerio from "cheerio-util"
import deadByDaylight from "dead-by-daylight"
import got from "got"
import path from "path"
import yargs from "yargs"

import titleCase from "../src/lib/titleCase"

const gamepediaGot = got.extend({
  prefixUrl: "https://deadbydaylight.gamepedia.com",
})

function normalizeStringId(string) {
  return string.replace(/[^\da-z]/gi, "").toLowerCase()
}

const categories = {
  perks: {
    url: "Perks",
    getData(html) {
      const gamepediaTitleCorrections = {
        "Barbecue & Chilli": "Barbecue & Chili",
      }
      const dom = cheerio.load(html)
      const tables = dom("table.sortable").toArray()
      const result = {}
      for (const table of tables) {
        const trs = dom("tr", table).toArray()
        for (const tr of trs) {
          const titleTd = dom(">*:nth-child(2)", tr)
          const descriptionTd = dom(">*:nth-child(3)", tr)
          if (!titleTd.length || !descriptionTd.length) {
            continue
          }
          const title = dom.text(titleTd).trim()
          const titleNormalized = normalizeStringId(gamepediaTitleCorrections[title] || title)
          const matchingObject = Object.values(deadByDaylight.perks).find(object => {
            const matchNormalized = normalizeStringId(object.title)
            return matchNormalized === titleNormalized
          })
          if (!matchingObject) {
            continue
          }
          result[matchingObject.id] = dom.text(descriptionTd).trim()
        }
      }
      for (const object of Object.values(deadByDaylight.perks)) {
        if (!object.visible) {
          continue
        }
        if (!result[object.id]) {
          console.log(chalk.yellow(`In dead-by-daylight, but not on Gamepedia: ${object.title}`))
        }
      }
      return result
    },
  },
  addOns: {
    url: "Add-ons",
    getData(html) {
      const itemAddOns = Object.values(deadByDaylight.addOns).filter(addOn => {
        if (!addOn.visible) {
          return false
        }
        return addOn.forType === "item"
      })
      const dom = cheerio.load(html)
      const tables = dom("table").toArray()
      const result = {}
      for (const table of tables) {
        const trs = dom("tr", table).toArray()
        for (const tr of trs) {
          const titleTd = dom(">*:nth-child(2)", tr)
          const descriptionTd = dom(">*:nth-child(4)", tr)
          if (!titleTd.length || !descriptionTd.length) {
            continue
          }
          const title = dom.text(titleTd).trim()
          const titleNormalized = normalizeStringId(title)
          const matchingObject = itemAddOns.find(object => {
            const matchNormalized = normalizeStringId(object.title)
            return matchNormalized === titleNormalized
          })
          if (!matchingObject) {
            continue
          }
          result[matchingObject.id] = dom.text(descriptionTd).trim()
        }
      }
      for (const object of itemAddOns) {
        if (!result[object.id]) {
          console.log(chalk.yellow(`In dead-by-daylight, but not on Gamepedia: ${object.title}`))
        }
      }
      return result
    },
  },
  killers: {
    async getData() {
      const result = {}
      const gamepediaTitleCorrections = {
        "Grandma's Heart": "Granma's Heart",
        Jewellery: "Jewelry",
        "Jewellery Box": "Jewelry Box",
      }
      for (const killer of Object.values(deadByDaylight.killers)) {
        result[killer.id] = {
          addOns: {},
        }
        const url = titleCase(killer.id).replace(/ /g, "_")
        const gotResult = await gamepediaGot(url)
        const dom = cheerio.load(gotResult.body)
        const killerAddOns = Object.values(deadByDaylight.addOns).filter(addOn => {
          if (!addOn.visible) {
            return false
          }
          return addOn.for === killer.id
        })
        const tables = dom("table").toArray()
        for (const table of tables) {
          const trs = dom("tr", table).toArray()
          for (const tr of trs) {
            const titleTd = dom(">*:nth-child(2)", tr)
            const descriptionTd = dom(">*:nth-child(4)", tr)
            if (!titleTd.length || !descriptionTd.length) {
              continue
            }
            const title = dom.text(titleTd).trim()
            const titleNormalized = normalizeStringId(gamepediaTitleCorrections[title] || title)
            const matchingObject = killerAddOns.find(object => {
              const matchNormalized = normalizeStringId(object.title)
              return matchNormalized === titleNormalized
            })
            if (!matchingObject) {
              continue
            }
            result[killer.id].addOns[matchingObject.id] = dom.text(descriptionTd).trim()
          }
        }
        for (const object of killerAddOns) {
          if (!result[killer.id].addOns[object.id]) {
            console.log(chalk.yellow(`In dead-by-daylight, but not on Gamepedia: ${object.title}`))
          }
        }
      }
      return result
    },
  },
}

async function job() {
  const outputFolder = path.resolve(__dirname, "..", "dist", "gamepedia")
  const jobs = Object.entries(categories).map(async ([id, properties]) => {
    let html
    let data
    const writeJobs = []
    if (properties.url) {
      const result = await gamepediaGot(properties.url)
      html = result.body
      const htmlFile = path.join(outputFolder, id, "page.html")
      writeJobs.push(fsp.outputFile(htmlFile, html))
      data = await properties.getData(html)
    } else {
      try {
        data = await properties.getData()
      } catch (error) {
        debugger
      }
    }
    const dataFile = path.join(outputFolder, id, "data.yml")
    writeJobs.push(fsp.outputYaml(dataFile, data))
    await Promise.all(writeJobs)
    console.log(chalk.green(`Fetched ${id}`))
  })
  await Promise.all(jobs)
}

yargs
  .command("$0", "", {}, job).argv