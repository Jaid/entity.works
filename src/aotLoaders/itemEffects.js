const path = require("path")

const globby = require("globby")
const readFileString = require("read-file-string").default

module.exports = async () => {
  const addOnsFolder = path.resolve(__dirname, "..", "data", "items")
  const addOnIds = await globby("*", {
    cwd: addOnsFolder,
    onlyDirectories: true,
  })
  const jobs = addOnIds.map(async id => {
    const effectFile = path.join(addOnsFolder, id, "effect.txt")
    const effect = await readFileString(effectFile)
    return [id, effect]
  })
  const result = await Promise.all(jobs)
  return Object.fromEntries(result)
}