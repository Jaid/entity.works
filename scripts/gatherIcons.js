import fsp from "@absolunet/fsp"
import chalk from "chalk"
import deadByDaylight from "dead-by-daylight"
import path from "path"
import yargs from "yargs"

async function job(argv) {
  const deadByDaylightFolder = process.env.deadByDaylightFolder || path.resolve("E:/Steam Library", "steamapps", "common", "Dead by Daylight", "DeadByDaylight", "Content")
  const iconsFolder = path.resolve(__dirname, "..", "src", "gameIcons")
  await fsp.ensureDir(iconsFolder)
  const copyTasks = []
  for (const {id, iconPath} of Object.values(deadByDaylight.perks)) {
    copyTasks.push({
      from: iconPath,
      to: `${id}.png`,
    })
  }
  for (const {powerIconPath, powerId} of Object.values(deadByDaylight.killers)) {
    copyTasks.push({
      from: powerIconPath,
      to: `${powerId}.png`,
    })
  }
  for (const {from, to} of copyTasks) {
    const fullFrom = path.join(deadByDaylightFolder, from)
    const fullTo = path.join(iconsFolder, to)
    const exists = await fsp.pathExists(fullTo)
    if (exists) {
      console.log(`${chalk.gray("Skipping")} ${from} ${chalk.gray("(already exists)")}`)
      continue
    }
    console.log(`${chalk.yellow(from)} -> ${chalk.yellow(to)}`)
    await fsp.copyFile(fullFrom, fullTo)
  }
}

yargs
  .command("$0", "", {}, job).argv