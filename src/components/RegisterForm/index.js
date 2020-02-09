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
  form: "register",
  validate(values) {
    const errors = {}
    if (isEmpty(values.user)) {
      errors.user = "Empty"
    }
    if (isEmpty(values.password)) {
      errors.password = "Empty"
    }
    if (values.password !== values.passwordRepeat) {
      errors.password = "Not the same as repeated"
    }
    return errors
  },
})

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class RegisterForm extends React.Component {

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
          <Field autoComplete="username" className={css.field} component={TextInput} name="user" title="User"/>
          <Field autoComplete="new-password" className={css.field} component={TextInput} name="password" title="Password" password/>
          <Field autoComplete="new-password" className={css.field} component={TextInput} name="passwordRepeat" title="Password (repeat)" password/>
        </div>
        <button disabled={!this.props.valid} type="submit">Register</button>
      </form>
    </div>
  }

}