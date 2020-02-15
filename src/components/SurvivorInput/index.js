import classnames from "classnames"
import {isEmpty} from "has-content"
import PropTypes from "prop-types"
import React from "react"

import Survivor from "lib/Survivor"
import SurvivorImage from "components/SurvivorImage"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class SurvivorInput extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    survivorList: PropTypes.array,
    title: PropTypes.string,
    onChange: PropTypes.func,
    input: PropTypes.any.isRequired,
  }

  static defaultProps = {
    title: "Survivor",
  }

  getImage() {
    if (isEmpty(this.props.input.value)) {
      return null
    }
    return <SurvivorImage className={css.icon} survivorId={this.props.input.value}/>
  }

  render() {
    const survivorList = this.props.survivorList || Survivor.allVisible
    const options = survivorList.map(survivor => {
      return <option key={survivor.id} value={survivor.id}>{survivor.shortTitle}</option>
    })
    return <div className={classnames(css.container, this.props.className)}>
      <div>
        <div>
          {this.props.title}
        </div>
        <select onChange={this.props.input.onChange.bind(this)}>
          <option value="">(any)</option>
          {options}
        </select>
      </div>
      {this.getImage()}
    </div>
  }

}