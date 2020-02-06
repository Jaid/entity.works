import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import {Field, reduxForm} from "redux-form"

import BuildKillerLoadoutForm from "components/BuildKillerLoadoutForm"
import TextInput from "components/TextInput"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   FormComponent: *,
  * }} Props
  */

@reduxForm({
  form: "build",
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
    formType: PropTypes.object.isRequired,
    change: PropTypes.func.isRequired,
  }

  getFormComponent() {
    if (this.props.formType.id === "killerLoadout") {
      return BuildKillerLoadoutForm
    }
  }

  render() {
    const FormComponent = this.getFormComponent()
    return <div className={classnames(css.container, this.props.className)}>
      <form>
        <div>Title</div>
        <Field className={css.titleInput} component={TextInput} name="title"/>
        <FormComponent change={this.props.change}/>
      </form>
    </div>
  }

}