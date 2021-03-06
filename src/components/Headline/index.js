import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import css from "./style.scss"

/**
  * @typedef {{
  *  className: *,
  *  children: *,
  *  miniText: [string],
  *  theme: [string]
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class Headline extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    children: PropTypes.node.isRequired,
    miniText: PropTypes.string,
    theme: PropTypes.string,
  }

  static defaultProps = {
    theme: "red",
  }

  render() {
    return <div className={classnames(css.container, css[`${this.props.theme}Theme`], this.props.className)}>
      <div className={css.overTitle}>{this.props.miniText}</div>
      <h2 className={css.title}>{this.props.children}</h2>
    </div>
  }

}