import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import ImageSelect from "components/ImageSelect"
// import PresetSelect from "components/PresetSelect"
// import PresetOptions from "components/PresetOptions"
import PresetControls from "components/PresetControls"
import {reduxForm, FieldArray, Field} from "redux-form"
import ExportButton from "components/ExportButton"
import ExportTitleField from "components/ExportTitleField"

import css from "./style.scss"

@reduxForm({
  form: "controls",
  enableReinitialize: true,
})
export default class Controls extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  }

  render() {
    return <div className={classnames(css.container, this.props.className)}>
      <div className={css.title}>Controls</div>
      <form>
        <Field name="image" component={ImageSelect} className={css.imageSelect}/>
        <FieldArray name="presets" component={PresetControls}/>
        <ExportTitleField/>
        <ExportButton/>
      </form>
    </div>
  }

}