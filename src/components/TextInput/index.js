import classnames from "classnames"
import {omit} from "lodash"
import PropTypes from "prop-types"
import React from "react"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   multiline: boolean,
  *   title: string
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
    input: PropTypes.object.isRequired,
    multiline: PropTypes.bool,
    password: PropTypes.bool,
  }

  getTitle() {
    if (!this.props.title) {
      return null
    }
    return <div className={css.title}>{this.props.title}</div>
  }

  getInput() {
    const inputProps = omit(this.props, [
      "className",
      "title",
      "multiline",
      "password",
      "input",
      "meta",
    ])
    if (this.props.multiline) {
      return <textarea className={css.input} {...inputProps} onChange={this.props.input.onChange.bind(this)}/>
    }
    if (this.props.password) {
      return <input className={css.input} type="password" {...inputProps} onChange={this.props.input.onChange.bind(this)}/>
    }
    return <input className={css.input} type="text" {...inputProps} onChange={this.props.input.onChange.bind(this)}/>
  }

  render() {
    const input = this.getInput()
    return <div className={classnames(this.props.className)}>
      {this.getTitle()}
      {input}
    </div>
  }

}