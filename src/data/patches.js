const path = require("path")

const fsp = require("@absolunet/fsp")
const moment = require("moment")

module.exports = async () => {
  const dataFolder = path.join(__dirname, "..", "data")
  const patchesFolder = path.join(dataFolder, "patches")
  const versions = await fsp.readdir(patchesFolder)
  const fetchPatchesJobs = versions.map(async version => {
    const logFile = path.join(patchesFolder, version, "log.yml")
    const data = await fsp.readYaml(logFile)
    return data
  })
  const patches = await Promise.all(fetchPatchesJobs)
  return patches.sort((a, b) => -moment(a.date, "DD.MM.YYYY").diff(moment(b.date, "DD.MM.YYYY")))
}