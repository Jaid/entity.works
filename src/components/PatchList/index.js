import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import Patch from "lib/Patch"
import PatchBlock from "components/PatchBlock"

import css from "./style.scss"

export default class PatchList extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  }

  render() {
    const patchBlocks = Patch.all.map(patch => <PatchBlock key={patch.semver} patch={patch}/>)
    return <div className={classnames(css.container, this.props.className)}>
      {patchBlocks}
    </div>
  }

}