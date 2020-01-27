const path = require("path")

const globby = require("globby")
const readFileString = require("read-file-string").default

module.exports = async () => {
  const killersFolder = path.resolve(__dirname, "..", "data", "killers")
  const killerIds = await globby("*", {
    cwd: killersFolder,
    onlyDirectories: true,
  })
  const jobs = killerIds.map(async id => {
    const effectFile = path.join(killersFolder, id, "power.txt")
    const effect = await readFileString(effectFile)
    return [id, effect]
  })
  const result = await Promise.all(jobs)
  return Object.fromEntries(result)
}