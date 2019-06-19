import React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import Preview from "components/Preview"
import Controls from "components/Controls"
import classnames from "classnames"
import {mapValues} from "lodash"
import mainActions from "mainActions"
import query from "src/query"

import "rc-select/assets/index.css"
import "./rc-select.scss"

import "rc-input-number/assets/index.css"
import "./rc-input-number.scss"

import css from "./style.scss"

@connect(({main, socket}) => ({
  previewData: main.previews,
  mode: main.mode,
  optionsMeta: main.options,
  selectedPreset: main.selectedPreset,
  selectedImage: main.selectedImage,
  connectionStatus: socket.status,
}), dispatch => ({
  onControlsChange: values => dispatch({
    type: "@@socket/send/setOptions",
    payload: values,
  }),
}))
export default class App extends React.Component {

  static propTypes = {
    previewData: PropTypes.array,
    optionsMeta: PropTypes.object,
    onControlsChange: PropTypes.func.isRequired,
    mode: PropTypes.string,
    selectedPreset: PropTypes.string,
    selectedImage: PropTypes.string,
    connectionStatus: PropTypes.string.isRequired,
  }

  static defaultProps = {
    previewData: [],
  }

  render() {
    if (this.props.connectionStatus !== "connected") {
      return this.props.mode === "mirror" ? null : "Not connected."
    }
    if (!this.props.optionsMeta && this.props.mode === "user") {
      return this.props.mode === "mirror" ? null : "Waiting for options."
    }
    const previews = this.props.previewData.map(preview => <Preview key={preview.previewId} mode={this.props.mode} presetSchema={this.props.optionsMeta.presets[preview.presetName]} {...preview}/>)
    const previewsContainerStyle = {}
    if (query.previewsWidth) {
      previewsContainerStyle.maxWidth = `${query.previewsWidth}px`
    }
    return <div className={classnames(css.container, css[`mode-${this.props.mode}`])}>
      {this.props.mode === "user" && <Controls onChange={this.props.onControlsChange} className={css.controls} scheme={this.props.optionsMeta}/>}
      <div style={previewsContainerStyle} className={classnames(css.previews, Boolean(query.previewsRight) && css.previewsRight)}>{previews}</div>
    </div>
  }

}