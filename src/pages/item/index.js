import PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet"

import Item from "lib/Item"
import ItemBlock from "components/ItemBlock"
import Title from "components/Title"

import css from "./style.scss"

/**
  * @typedef {{
  *   match: {
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
export default class ItemPage extends React.Component {

  static propTypes = {
    match: PropTypes.exact({
      isExact: PropTypes.bool.isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      params: PropTypes.object,
    }).isRequired,
  }

  render() {
    const item = Item.find(this.props.match.params.id)
    if (!item) {
      return `No item found for "${this.props.match.params.id}".`
    }
    return <main className={css.container}>
      <Helmet>
        <title>{item.title} | Dead by Daylight Item</title>
      </Helmet>
      <Title>{item.title} Item</Title>
      <ItemBlock itemId={item.id}/>
    </main>
  }

}