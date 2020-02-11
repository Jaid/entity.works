import classnames from "classnames"
import {isEmpty} from "has-content"
import PropTypes from "prop-types"
import React from "react"
import {Field, reduxForm} from "redux-form"

import TextInput from "components/TextInput"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  * }} Props
  */

@reduxForm({
  form: "login",
  validate(values) {
    const errors = {}
    if (isEmpty(values.user)) {
      errors.user = "Empty"
    }
    if (isEmpty(values.password)) {
      errors.password = "Empty"
    }
    return errors
  },
})

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    handleSubmit: PropTypes.func.isRequired,
    valid: PropTypes.bool.isRequired,
  }

  render() {
    return <div className={classnames(css.container, this.props.className)}>
      <form onSubmit={this.props.handleSubmit}>
        <div className={css.fields}>
          <Field autoComplete="username" className={css.field} component={TextInput} name="user" title="User" focusOnMount/>
          <Field autoComplete="password" className={css.field} component={TextInput} name="password" title="Password" password/>
        </div>
        <button disabled={!this.props.valid} type="submit">Login</button>
      </form>
    </div>
  }

}