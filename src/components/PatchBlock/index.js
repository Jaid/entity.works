import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import moment from "moment"
import PatchLines from "components/PatchLines"

import css from "./style.scss"

const getHeaderText = patch => {
  const agoString = moment(patch.date, "DD.MM.YYYY").fromNow()
  if (patch.title) {
    return {
      title: patch.title,
      info: `${patch.semver} - ${agoString}`,
    }
  } else {
    return {
      title: `Patch ${patch.semver}`,
      info: agoString,
    }
  }
}

export default class PatchBlock extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    patch: PropTypes.object.isRequired,
  }

  render() {
    const headerText = getHeaderText(this.props.patch)
    const categoryBlocks = Object.entries(this.props.patch.points).map(([category, points]) => {
      return <div key={category}>
        <div className={classnames(css.categoryTitle, css[category])}>{category}</div>
        <PatchLines points={points}/>
      </div>
    })
    return <div className={classnames(css.container, this.props.className)}>
      <div className={css.header}>
        <div className={css.headerInfo}>{headerText.info}</div>
        <div className={css.title}>{headerText.title}</div>
      </div>
      {categoryBlocks}
    </div>
  }

}