import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import patchData from "src/data/patches.yml"
import PatchBlock from "components/PatchBlock"

import css from "./style.scss"

export default class PatchList extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  }

  render() {
    const patchBlocks = patchData.map(patch => <PatchBlock patch={patch}/>)
    return <div className={classnames(css.container, this.props.className)}>
      {patchBlocks}
    </div>
  }

}