import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import {ensureObject, ensureArray} from "magina"

import css from "./style.scss"

export default class PatchLines extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    points: PropTypes.arrayOf(PropTypes.any).isRequired,
  }

  render() {
    const lines = ensureArray(this.props.points).map((point, index) => {
      point = ensureObject(point, "text")
      return <li key={index} className={css.patchLine}>{point.text}{point.points && <PatchLines points={point.points}/>}</li>
    })
    return <div className={classnames(css.container, this.props.className)}>
      <ul>{lines}</ul>
    </div>
  }

}