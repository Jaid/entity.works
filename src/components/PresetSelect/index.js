import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import immer from "immer"
import {mapValues} from "lodash"
import RcSelect, {Option} from "rc-select"
import shortid from "shortid"

import css from "./style.scss"

export default class PresetSelect extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    fields: PropTypes.object.isRequired,
    scheme: PropTypes.object.isRequired,
  }

  render() {
    const options = Object.entries(this.props.scheme).map(([name, properties]) => {
      return <Option key={name}>{properties.title}</Option>
    })

    return <RcSelect value=""
      placeholder="Add preset"
      className={this.props.className}
      onSelect={name => this.props.fields.push({
        name,
        options: mapValues(this.props.scheme[name].optionsSchema, ({defaultValue}) => defaultValue),
        previewId: shortid.generate(),
      })}>
      {options}
    </RcSelect>
  }

}