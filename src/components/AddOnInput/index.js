import classnames from "classnames"
import {isEmpty} from "has-content"
import PropTypes from "prop-types"
import React from "react"

import AddOn from "lib/AddOn"
import collator from "lib/collator"
import AddOnImage from "components/AddOnImage"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   title: string,
  *   name: string,
  *   onlyKillerPerks: boolean,
  *   onlySurvivorPerks: boolean
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class AddOnInput extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    title: PropTypes.string,
    filter: PropTypes.string,
    input: PropTypes.any.isRequired,
  }

  getAddOnList() {
    if (!this.props.filter) {
      return AddOn.allVisible
    }
    return AddOn.findByOwner(this.props.filter)
  }

  getImage() {
    if (isEmpty(this.props.input.value)) {
      return null
    }
    return <AddOnImage addOnId={this.props.input.value} height="2.5em"/>
  }

  render() {
    const addOnList = [...this.getAddOnList()]
    addOnList.sort((addOn1, addOn2) => {
      return collator.compare(addOn1.title, addOn2.title)
    })
    const options = addOnList.map(addOn => {
      return <option key={addOn.id} value={addOn.id}>{addOn.title}</option>
    })
    return <div className={classnames(css.container, this.props.className)}>
      <div>
        <div>
          {this.props.title}
        </div>
        <select onChange={this.props.input.onChange.bind(this)}>
          <option value="">(none)</option>
          {options}
        </select>
      </div>
      {this.getImage()}
    </div>
  }

}