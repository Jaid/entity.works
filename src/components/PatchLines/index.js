import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import {ensureObject, ensureArray} from "magina"
import reactStringReplace from "react-string-replace"
import PerkBox from "components/PerkBox"
import KillerBox from "components/KillerBox"

import css from "./style.scss"

const getRichText = text => {
  return reactStringReplace(text, /{{([\w:]+)}}/g, (token, index) => {
    const [type, name] = token.split(":")
    if (type === "killer") {
      return <KillerBox key={index} killer={name}/>
    }
    if (type === "perk") {
      return <PerkBox key={index} perk={name}/>
    }
  })
}

export default class PatchLines extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    points: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.any), PropTypes.string]).isRequired,
  }

  render() {
    const lines = ensureArray(this.props.points).map((point, index) => {
      point = ensureObject(point, "text")
      const richText = getRichText(point.text)
      return <li key={index} className={css.patchLine}>{richText}{point.points && <PatchLines points={point.points}/>}</li>
    })
    return <div className={classnames(css.container, this.props.className)}>
      <ul>{lines}</ul>
    </div>
  }

}