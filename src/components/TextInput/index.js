import classnames from "classnames"
import {omit} from "lodash"
import PropTypes from "prop-types"
import React from "react"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class TextInput extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    title: PropTypes.string,
  }

  getTitle() {
    if (!this.props.title) {
      return null
    }
    return <div className={css.title}>{this.props.title}</div>
  }

  render() {
    const inputProps = omit(this.props, ["className", "title"])
    const input = <input className={css.input} type="text" {...inputProps}/>
    return <div className={classnames(this.props.className)}>
      {this.getTitle()}
      {input}
    </div>
  }

}