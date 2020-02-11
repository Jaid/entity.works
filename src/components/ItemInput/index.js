import classnames from "classnames"
import {isEmpty} from "has-content"
import PropTypes from "prop-types"
import React from "react"

import collator from "lib/collator"
import Item from "lib/Item"
import ItemImage from "components/ItemImage"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   title: string,
  *   name: string,
  *   onlyKillerItems: boolean,
  *   onlySurvivorItems: boolean
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class ItemInput extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    title: PropTypes.string,
    name: PropTypes.string.isRequired,
    onlyKillerItems: PropTypes.bool,
    onlySurvivorItems: PropTypes.bool,
    input: PropTypes.any.isRequired,
  }

  getItemList() {
    if (this.props.onlyKillerItems) {
      return Item.forKiller
    }
    if (this.props.onlySurvivorItems) {
      return Item.forSurvivor
    }
    return Item.allVisible
  }

  getImage() {
    if (isEmpty(this.props.input.value)) {
      return <span className={css.iconPlaceholder}/>
    }
    return <ItemImage height="2.5em" itemId={this.props.input.value}/>
  }

  render() {
    const itemList = [...this.getItemList()]
    itemList.sort((item1, item2) => {
      return collator.compare(item1.title, item2.title)
    })
    const options = itemList.map(item => {
      return <option key={item.id} value={item.id}>{item.title}</option>
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