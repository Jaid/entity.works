import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import replaceString from "replace-string"

import findObject from "lib/findObject"
import Headline from "components/Headline"
import ItemImage from "components/ItemImage"
import ItemLink from "components/ItemLink"
import RichText from "components/RichText"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   itemId: string,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class ItemBlock extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    itemId: PropTypes.string.isRequired,
  }

  render() {
    const item = findObject(this.props.itemId)
    return <div className={classnames(css.container, this.props.className)}>
      <Headline miniText={item.overTitle} theme="item">{item.title}</Headline>
      <div className={css.content}>
        <ItemImage className={css.image} itemId={this.props.itemId}/>
        <div className={css.text}>
          <ItemLink itemId={this.props.itemId}>{item.title}</ItemLink>
          <RichText className={css.effect}>
            {replaceString(item.richEffect, "{this}", `{${item.id}}`)}
          </RichText>
        </div>
      </div>
    </div>
  }

}