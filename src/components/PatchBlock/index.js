import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import patchData from "src/data/patches"
import moment from "moment"
import {omit} from "lodash"
import PatchContent from "components/PatchContent"

import css from "./style.scss"

const getHeaderText = patch => {
  const agoString = moment(patch.date, "DD.MM.YYYY").fromNow()
  if (patch.title) {
    return {
      title: patch.title,
      info: path.semver + " - " + agoString
    }
  } else {
    return {
      title: "Patch " + patch.semver,
      info: agoString
    }
  }
}

export default class PatchBlock extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    patch: PropTypes.object.isRequired
  }

  render() {
    const headerText = getHeaderText(this.props.patch)

    return <div className={classnames(css.container, this.props.className)}>
      <div className={css.header}>
        <div className={css.headerInfo}>{headerText.info}</div>
        <div className={css.title}>{headerText.title}</div>
      </div>
     <PatchContent points={this.props.patch.points}/>
    </div>
  }

}