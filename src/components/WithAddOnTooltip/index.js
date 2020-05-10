import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import replaceString from "replace-string"

import findObject from "lib/findObject"
import AddOnImage from "src/components/AddOnImage"
import RichText from "src/components/RichText"
import Tooltip from "src/components/Tooltip"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   addOnId: string
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class WithAddOnTooltip extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    addOnId: PropTypes.string.isRequired,
    children: PropTypes.node,
  }

  getContent() {
    const addOn = findObject(this.props.addOnId)
    return <div className={classnames(css.container, this.props.className)}>
      <div className={css.banner}>
        <AddOnImage addOnId={addOn.id} className={css.icon} height="3em" noTooltip/>
        <div className={css.info}>
          {addOn.title}
        </div>
      </div>
      <div className={css.effect}>
        <RichText>{replaceString(addOn.richEffect, "{this}", addOn.title)}</RichText>
      </div>
    </div>
  }

  render() {
    return <Tooltip html={this.getContent()} minWidth={300} noPadding>
      {this.props.children}
    </Tooltip>
  }

}