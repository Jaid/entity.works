import classnames from "classnames"
import hasContent from "has-content"
import {ensureArray, ensureObject} from "magina"
import PropTypes from "prop-types"
import React from "react"

import RichText from "src/components/RichText"

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
      if (!this.props.showReferences && hasContent(point.for)) {
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