import classnames from "classnames"
import {capitalize} from "lodash"
import PropTypes from "prop-types"
import React from "react"
import {Helmet} from "react-helmet"

import Item from "lib/Item"
import itemTypes from "lib/itemTypes"
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

  render() {
    const type = itemTypes.find(itemType => itemType.linkId === this.props.match.params.type)
    const items = Item.findByType(type.id)
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
        <Title>{pageTitle}</Title>
        {itemBlocks}
      </NavigationPage>
    </main>
  }

}