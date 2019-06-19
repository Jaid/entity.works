import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import PresetControl from "components/PresetControl"
import PresetSelect from "components/PresetSelect"
import {connect} from "react-redux"

import css from "./style.scss"

@connect(({main}) => ({
  optionsScheme: main.options.presets,
}))
export default class PresetControls extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    fields: PropTypes.object.isRequired,
    optionsScheme: PropTypes.object.isRequired,
  }

  render() {
    const presetControls = this.props.fields.map((key, index, fields) => {
      return <PresetControl scheme={this.props.optionsScheme} key={key} formKey={key} index={index} fields={fields}/>
    })
    return <div className={classnames(css.container, this.props.className)}>
      Add preset
      <PresetSelect fields={this.props.fields} scheme={this.props.optionsScheme}/>
      {presetControls}
    </div>
  }

}