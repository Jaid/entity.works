import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import patchData from "src/data/patches.yml"
import PatchBlock from "components/PatchBlock"

import css from "./style.scss"

export default class PatchContent extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    points: PropTypes.object.isRequired
  }

  render() {
    return "abc"
  }

}