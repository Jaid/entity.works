import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import PatchLines from "components/PatchLines"
import KillerBox from "components/KillerBox"
import PerkBox from "components/PerkBox"
import SurvivorBox from "components/SurvivorBox"

import css from "./style.scss"

const getHeader = (referenceType, referenceName) => {
  if (referenceType === "killers") {
    return <KillerBox killer={referenceName} large/>
  }
  if (referenceType === "perks") {
    return <PerkBox perk={referenceName} large/>
  }
  if (referenceType === "survivors") {
    return <SurvivorBox survivor={referenceName} large/>
  }
}

export default class PatchReferenceBlock extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    points: PropTypes.arrayOf(PropTypes.object).isRequired,
    referenceType: PropTypes.oneOf(["killers", "perks", "survivors", "maps"]).isRequired,
    referenceName: PropTypes.string.isRequired,
  }

  render() {
    return <div className={classnames(css.container, this.props.className, css[this.props.referenceType])}>
      <div className={css.header}>{getHeader(this.props.referenceType, this.props.referenceName)}</div>
      <PatchLines points={this.props.points} showReferences/>
    </div>
  }

}