const path = require("path")

const fsp = require("@absolunet/fsp")
const filterNil = require("filter-nil").default

module.exports = async () => {
  const patchesFolder = __dirname
  const versions = await fsp.readdir(patchesFolder)
  const fetchPatchesJobs = versions.map(async version => {
    const logFile = path.join(patchesFolder, version, "log.yml")
    const logFileExists = await fsp.pathExists(logFile)
    if (!logFileExists) {
      return null
    }
    const data = await fsp.readYaml(logFile)
    return data
  })
  const patches = await Promise.all(fetchPatchesJobs)
  return patches |> filterNil
}