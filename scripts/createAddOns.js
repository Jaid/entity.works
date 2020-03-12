import fsp from "@absolunet/fsp"
import deadByDaylight from "dead-by-daylight"
import path from "path"
import yargs from "yargs"

async function job() {
  for (const addOn of Object.values(deadByDaylight.addOns)) {
    const metaFolder = path.resolve(__dirname, "..", "src", "data", "addOns", addOn.id)
    const metaFolderExists = await fsp.pathExists(metaFolder)
    if (metaFolderExists) {
      continue
    }
    const effectFile = path.join(metaFolder, "effect.txt")
    await fsp.outputFile(effectFile, "")
    console.log(`Created stub for ${addOn.id}`)
  }
}

yargs
  .command("$0", "", {}, job).argv