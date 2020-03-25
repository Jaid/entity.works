const path = require("path")

const globby = require("globby")
const readFileYaml = require("read-file-yaml").default

module.exports = async () => {
  const dataFolder = path.resolve(__dirname, "..", "..", "dist", "gamepedia")
  const categories = await globby("*", {
    cwd: dataFolder,
    onlyDirectories: true,
  })
  const jobs = categories.map(async id => {
    const dataFile = path.join(dataFolder, id, "data.yml")
    const data = await readFileYaml(dataFile)
    return [id, data]
  })
  const result = await Promise.all(jobs)
  return Object.fromEntries(result)
}