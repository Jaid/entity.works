const path = require("path")

const globby = require("globby")
const readFileString = require("read-file-string").default

module.exports = async () => {
  const perksFolder = path.resolve(__dirname, "..", "data", "offerings")
  const perkIds = await globby("*", {
    cwd: perksFolder,
    onlyDirectories: true,
  })
  const jobs = perkIds.map(async id => {
    const effectFile = path.join(perksFolder, id, "effect.txt")
    const effect = await readFileString(effectFile)
    return [id, effect]
  })
  const result = await Promise.all(jobs)
  return Object.fromEntries(result)
}