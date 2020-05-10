import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import replaceString from "replace-string"

import findObject from "lib/findObject"
import ItemImage from "src/components/ItemImage"
import RichText from "src/components/RichText"
import Tooltip from "src/components/Tooltip"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   itemId: string
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class WithItemTooltip extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    itemId: PropTypes.string.isRequired,
    children: PropTypes.node,
  }

  getContent() {
    const item = findObject(this.props.itemId)
    return <div className={classnames(css.container, this.props.className)}>
      <div className={css.banner}>
        <ItemImage className={css.icon} height="3em" itemId={item.id} noTooltip/>
        <div className={css.info}>
          {item.title}
        </div>
      </div>
      <div className={css.effect}>
        <RichText>{replaceString(item.richEffect, "{this}", item.title)}</RichText>
      </div>
    </div>
  }

  render() {
    return <Tooltip html={this.getContent()} minWidth={300} noPadding>
      {this.props.children}
    </Tooltip>
  }

}