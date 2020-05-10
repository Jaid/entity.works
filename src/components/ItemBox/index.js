import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import findObject from "lib/findObject"
import ItemImage from "src/components/ItemImage"
import ItemLink from "src/components/ItemLink"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   itemId: string,
  *   imageHeight: string
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class ItemBox extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    imageHeight: PropTypes.string,
    itemId: PropTypes.string.isRequired,
  }

  static defaultProps = {
    imageHeight: "2em",
  }

  render() {
    const item = findObject(this.props.itemId)
    return <span className={classnames()}>
      <ItemImage height={this.props.imageHeight} itemId={this.props.itemId}/><ItemLink itemId={this.props.itemId}>{item.title}</ItemLink>
    </span>
  }

}