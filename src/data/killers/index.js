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
    const data = await fsp.readYaml(infoFile)
    return {
      title: `The ${data.id |> capitalize}`,
      ...data,
    }
  })
  const killers = await Promise.all(fetchJobs)
  return killers
    |> #.filter(killer => killer)
}