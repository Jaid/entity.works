const path = require("path")

const fsp = require("@absolunet/fsp")
const filterNil = require("filter-nil").default

module.exports = async () => {
  const perksFolder = __dirname
  const perkIds = await fsp.readdir(perksFolder)
  const fetchPerksJobs = perkIds.map(async id => {
    const infoFile = path.join(perksFolder, id, "info.yml")
    const infoFileExists = await fsp.pathExists(infoFile)
    if (!infoFileExists) {
      return null
    }
    return fsp.readYaml(infoFile)
  })
  const perks = await Promise.all(fetchPerksJobs)
  return perks |> filterNil
}