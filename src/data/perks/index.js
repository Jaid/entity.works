const path = require("path")

const fsp = require("@absolunet/fsp")

module.exports = async () => {
  const perksFolder = __dirname
  const perkIds = await fsp.readdir(perksFolder)
  const fetchPerksJobs = perkIds.map(async id => {
    const infoFile = path.join(perksFolder, id, "info.yml")
    const infoFileExists = await fsp.pathExists(infoFile)
    if (!infoFileExists) {
      return null
    }
    const data = await fsp.readYaml(infoFile)
    return {
      title: data.id,
      teachable: false,
      visible: true,
      ...data,
    }
  })
  const perks = await Promise.all(fetchPerksJobs)
  return perks
    |> #.filter(perk => perk)
}