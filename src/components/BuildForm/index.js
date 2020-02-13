import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import {connect} from "react-redux"
import {Field, reduxForm} from "redux-form"

import BuildKillerLoadoutForm from "components/BuildKillerLoadoutForm"
import BuildKillerTierListForm from "components/BuildKillerTierListForm"
import BuildPreview from "components/BuildPreview"
import BuildSurvivorLoadoutForm from "components/BuildSurvivorLoadoutForm"
import LinkButton from "components/LinkButton"
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

@connect(({login}) => ({
  loggedIn: login.loggedIn,
}))

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
    loggedIn: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  getFormComponent() {
    if (this.props.formType.id === "killerLoadout") {
      return BuildKillerLoadoutForm
    }
    if (this.props.formType.id === "survivorLoadout") {
      return BuildSurvivorLoadoutForm
    }
    if (this.props.formType.id === "killerTierList") {
      return BuildKillerTierListForm
    }
  }

  getSaveButton() {
    const button = <button className={css.submitButton} disabled={!this.props.loggedIn || this.props.submitting} type="submit">Save</button>
    if (this.props.loggedIn) {
      return button
    }
    return <div>
      {button}
      <span className={css.loginNotice}>Login or register to save and publish this build.</span>
    </div>
  }

  render() {
    const FormComponent = this.getFormComponent()
    return <div className={classnames(css.container, this.props.className)}>
      <form onSubmit={this.props.handleSubmit}>
        <Field className={css.titleInput} component={TextInput} name="title" title="Title"/>
        <FormComponent change={this.props.change}/>
        {this.getSaveButton()}
      </form>
      <div className={css.buildPreview}>
        <SmallerTitle>Preview</SmallerTitle>
        <BuildPreview type={this.props.formType.id}/>
      </div>
    </div>
  }

}