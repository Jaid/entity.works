import classnames from "classnames"
import {isEmpty} from "has-content"
import {capitalize} from "lodash"
import PropTypes from "prop-types"
import React from "react"
import {Helmet} from "react-helmet"
import zahl from "zahl"

import AddOn from "lib/AddOn"
import collator from "lib/collator"
import getRarityIndex from "lib/getRarityIndex"
import Item from "lib/Item"
import itemTypes from "lib/itemTypes"
import AddOnBlock from "components/AddOnBlock"
import ItemBlock from "components/ItemBlock"
import NavigationPage from "components/NavigationPage"
import Title from "components/Title"

import css from "./style.scss"

/**
  * @typedef {{
  *  className: *,
  *  match: {
  *    isExact: boolean
  *    path: string
  *    url: string
  *    params: object.<string, string>
  *  },
  * }} Props
  */

function sortItems(item1, item2) {
  const rarityIndexDifference = getRarityIndex(item1.rarity) - getRarityIndex(item2.rarity)
  if (rarityIndexDifference !== 0) {
    return rarityIndexDifference
  }
  return collator.compare(item1.title, item2.title)
}

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class ItemsPage extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    match: PropTypes.exact({
      isExact: PropTypes.bool.isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      params: PropTypes.object,
    }).isRequired,
  }

  getAddOns(type) {
    const addOns = [...AddOn.findByOwner(type.id)]
    if (isEmpty(addOns)) {
      return null
    }
    addOns.sort(sortItems)
    const addOnBlocks = addOns.map(addOn => {
      return <AddOnBlock key={addOn.id} addOnId={addOn.id}/>
    })
    return <div>
      <Title>{zahl(addOns, `${type.title} Add-On`)}</Title>
      {addOnBlocks}
    </div>
  }

  render() {
    const type = itemTypes.find(itemType => itemType.linkId === this.props.match.params.type)
    const items = [...Item.findByType(type.id)]
    items.sort(sortItems)
    const itemBlocks = items.map(item => {
      return <ItemBlock key={item.id} className={css.itemBlock} itemId={item.id}/>
    })
    const links = Object.values(itemTypes).map(itemType => {
      return {
        text: `${itemType.title} (${Item.findByType(itemType.id).length})`,
        to: `/items/${itemType.linkId}`,
      }
    })
    const pageTitle = `${capitalize(this.props.match.params.type)} Items`
    return <main>
      <Helmet>
        <title>{pageTitle} | Dead by Daylight Item List</title>
      </Helmet>
      <NavigationPage className={classnames(css.container, this.props.className)} links={links}>
        <Title>{items.length} {pageTitle}</Title>
        {itemBlocks}
        {this.getAddOns(type)}
      </NavigationPage>
    </main>
  }

}