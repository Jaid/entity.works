import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import {connect} from "react-redux"
import {Field} from "redux-form"

import css from "./style.scss"

@connect(({form}) => ({
  imageName: form.controls?.values?.image,
}))
export default class ExportTitleField extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    imageName: PropTypes.string,
  }

  render() {
    return <Field name="exportTitle" placeholder={this.props.imageName} component="input" type="text"/>
  }

}