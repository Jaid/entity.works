import classnames from "classnames"
import {isEmpty} from "has-content"
import PropTypes from "prop-types"
import React from "react"
import {Field} from "redux-form"

import Killer from "lib/Killer"
import KillerImage from "components/KillerImage"

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
export default class KillerInput extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    killerList: PropTypes.array,
    title: PropTypes.string,
    onChange: PropTypes.func,
    input: PropTypes.any.isRequired,
  }

  static defaultProps = {
    title: "Killer",
  }

  getImage() {
    if (isEmpty(this.props.input.value)) {
      return null
    }
    return <KillerImage className={css.icon} killerId={this.props.input.value}/>
  }

  render() {
    const killerList = this.props.killerList || Killer.allVisible
    const options = killerList.map(killer => {
      return <option key={killer.id} value={killer.id}>{killer.shortTitle}</option>
    })
    return <div className={classnames(css.container, this.props.className)}>
      <div>
        <div>
          {this.props.title}
        </div>
        <select value={this.props.input.value} onChange={this.props.input.onChange.bind(this)}>
          <option value="">(any)</option>
          {options}
        </select>
      </div>
      {this.getImage()}
    </div>
  }

}