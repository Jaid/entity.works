const { default: configure } = require("babel-preset-jaid")

module.exports = api => configure(api, {react: "react-dom"})