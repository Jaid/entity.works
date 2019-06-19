import React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import RcSelect, {Option} from "rc-select"
import classnames from "classnames"
import {encode} from "base64-arraybuffer-es6"

import css from "./style.scss"

@connect(({main}) => ({
  images: main.options.images,
}))
export default class ImageSelect extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    images: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
  }

  render() {
    const options = Object.entries(this.props.images).map(([name, image]) => {
      let optionIcon
      if (image.thumbnail) {
        optionIcon = <img className={css.optionIcon} src={`data:image/webp;base64,${image.thumbnail |> encode}`}/>
      }
      return <Option key={name} className={css.option}>{optionIcon}<span className={css.optionTitle}>{name}</span></Option>
    })

    return <div className={classnames(this.props.className, css.container)}>
    Select image
      <RcSelect className={css.input} onSelect={this.props.input.onChange}>{options}</RcSelect>
    </div>
  }

}