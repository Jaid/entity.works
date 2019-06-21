const path = require("path")

const filterNil = require("filter-nil").default
const fsp = require("@absolunet/fsp")

module.exports = async () => {
  const survivorsFolder = __dirname
  const survivorIds = await fsp.readdir(survivorsFolder)
  const fetchJobs = survivorIds.map(async id => {
    const infoFile = path.join(survivorsFolder, id, "info.yml")
    const infoFileExists = await fsp.pathExists(infoFile)
    if (!infoFileExists) {
      return null
    }
    return fsp.readYaml(infoFile)
  })
  const survivors = await Promise.all(fetchJobs)
  return survivors |> filterNil
}