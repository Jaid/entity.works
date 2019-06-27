import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import css from "./style.scss"

const getCategoryTitle = category => {
  if (category === "features") {
    return "Features & Content"
  }
  if (category === "balance") {
    return "Balance Changes"
  }
  if (category === "fixes") {
    return "Bug Fixes"
  }
  if (category === "issues") {
    return "Known Issues"
  }
  return category
}

/**
  * @typedef {{
  *  className: *,
  *  category: string,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class PatchCategory extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    category: PropTypes.string.isRequired,
  }

  render() {
    const content = getCategoryTitle(this.props.category)
    return <div className={classnames(css.container, this.props.className)}>
      {content}
    </div>
  }

}