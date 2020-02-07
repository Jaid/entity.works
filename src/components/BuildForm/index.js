import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import {Field, reduxForm} from "redux-form"

import BuildKillerLoadoutForm from "components/BuildKillerLoadoutForm"
import BuildPreview from "components/BuildPreview"
import SmallerTitle from "components/SmallerTitle"
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

  static displayName = "BuildForm"

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
        <Field className={css.titleInput} component={TextInput} name="title" title="Title"/>
        <FormComponent change={this.props.change}/>
      </form>
      <SmallerTitle>Preview</SmallerTitle>
      <BuildPreview type={this.props.formType.id}/>
    </div>
  }

}