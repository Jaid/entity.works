import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import findObject from "lib/findObject"
import AddOnImage from "src/components/AddOnImage"
import AddOnLink from "src/components/AddOnLink"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   addOnId: string,
  *   imageHeight: string
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class AddOnBox extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    imageHeight: PropTypes.string,
    addOnId: PropTypes.string.isRequired,
  }

  static defaultProps = {
    imageHeight: "2em",
  }

  render() {
    const addOn = findObject(this.props.addOnId)
    return <span className={classnames()}>
      <AddOnImage addOnId={this.props.addOnId} height={this.props.imageHeight}/><AddOnLink addOnId={this.props.addOnId}>{addOn.title}</AddOnLink>
    </span>
  }

}