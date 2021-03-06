import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import KillerBox from "src/components/KillerBox"
import PatchLines from "src/components/PatchLines"
import PerkBox from "src/components/PerkBox"
import SurvivorBox from "src/components/SurvivorBox"

import css from "./style.scss"

const getHeader = (referenceType, referenceName) => {
  if (referenceType === "killer") {
    return <KillerBox killer={referenceName} large/>
  }
  if (referenceType === "perk") {
    return <PerkBox heightEm={3} perkId={referenceName}/>
  }
  if (referenceType === "survivor") {
    return <SurvivorBox survivor={referenceName} large/>
  }
}

export default class PatchReferenceBlock extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    points: PropTypes.arrayOf(PropTypes.object).isRequired,
    referenceType: PropTypes.oneOf(["killer", "perk", "survivor", "map"]).isRequired,
    referenceName: PropTypes.string.isRequired,
  }

  render() {
    return <div className={classnames(css.container, this.props.className, css[this.props.referenceType])}>
      <div className={css.header}>{getHeader(this.props.referenceType, this.props.referenceName)}</div>
      <PatchLines points={this.props.points} showReferences/>
    </div>
  }

}