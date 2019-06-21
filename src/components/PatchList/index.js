import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import patches from "lib/patches"
import PatchBlock from "components/PatchBlock"

import css from "./style.scss"

console.log(patches)

export default class PatchList extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  }

  render() {
    const patchBlocks = patches.map(patch => <PatchBlock key={patch.semver} patch={patch}/>)
    return <div className={classnames(css.container, this.props.className)}>
      {patchBlocks}
    </div>
  }

}