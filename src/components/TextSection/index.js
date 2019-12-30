import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   children: *,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class TextSection extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    children: PropTypes.node,
  }

  render() {
    return <div className={classnames(css.container, this.props.className)}>
      {this.props.children}
    </div>
  }

}