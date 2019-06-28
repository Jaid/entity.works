import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import css from "./style.scss"

const getCategoryTitle = category => {
  if (category === "features") {
    return "Features & Content"
    // return <div><i className={classnames("fa", "fa-cubes", css.categoryIcon)}/>Features & Content</div>
  }
  if (category === "balance") {
    return "Balance"
    // return <div><i className={classnames("fa", "fa-balance-scale", css.categoryIcon)}/>Balance Changes</div>
  }
  if (category === "fixes") {
    return "Bug Fixes"
    // return <div><i className={classnames("fa", "fa-wrench", css.categoryIcon)}/>Bug Fixes</div>
  }
  if (category === "issues") {
    return "Known Issues"
    // return <div><i className={classnames("fa", "fa-exclamation-circle", css.categoryIcon)}/>Known Issues</div>
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