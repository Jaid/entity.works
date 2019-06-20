const path = require("path")

const {capitalize} = require("lodash")
const fsp = require("@absolunet/fsp")

module.exports = async () => {
  const killersFolder = __dirname
  const killerIds = await fsp.readdir(killersFolder)
  const fetchJobs = killerIds.map(async id => {
    const infoFile = path.join(killersFolder, id, "info.yml")
    const infoFileExists = await fsp.pathExists(infoFile)
    if (!infoFileExists) {
      return null
    }
    return fsp.readYaml(infoFile)
  })
  const killers = await Promise.all(fetchJobs)
  return killers
    |> #.filter(killer => killer)
}