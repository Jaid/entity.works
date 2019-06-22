import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import {ensureObject, ensureArray} from "magina"
import reactStringReplace from "react-string-replace"
import PerkBox from "components/PerkBox"
import KillerBox from "components/KillerBox"
import SurvivorBox from "components/SurvivorBox"
import RichText from "components/RichText"

import css from "./style.scss"

export default class PatchLines extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    points: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.any), PropTypes.string]).isRequired,
    showReferences: PropTypes.bool,
  }

  static defaultProps = {
    showReferences: false,
  }

  render() {
    const lines = ensureArray(this.props.points).map((point, index) => {
      point = ensureObject(point, "text")
      if (!this.props.showReferences && point.hasReferences) {
        return null
      }
      return <li key={index} className={css.patchLine}>
        <RichText>{point.text}</RichText>
        {point.points && <PatchLines points={point.points}/>}
      </li>
    })
    return <div className={classnames(css.container, this.props.className)}>
      <ul>{lines}</ul>
    </div>
  }

}