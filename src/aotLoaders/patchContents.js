const path = require("path")

const globby = require("globby")
const readFileString = require("read-file-string").default
const preventEnd = require("prevent-end").default
const readFileYaml = require("read-file-yaml").default

module.exports = async () => {
  const patchesFolder = path.resolve(__dirname, "..", "data", "patches")
  const patchIds = await globby("*", {
    cwd: patchesFolder,
    onlyDirectories: true,
  })
  const jobs = patchIds.map(async id => {
    const points = {}
    const additionNames = await globby("*.yml", {
      cwd: path.join(patchesFolder, id),
      baseNameMatch: true,
    })
    const categoryJobs = additionNames.map(async categoryFileName => {
      const categoryId = preventEnd(categoryFileName, ".yml")
      points[categoryId] = await readFileYaml(path.join(patchesFolder, id, categoryFileName))
    })
    await Promise.all(categoryJobs)
    return [id, points]
  })
  const result = await Promise.all(jobs)
  return Object.fromEntries(result)
}