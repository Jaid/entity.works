import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import replaceString from "replace-string"

import findObject from "lib/findObject"
import PerkImage from "src/components/PerkImage"
import RichText from "src/components/RichText"
import Tooltip from "src/components/Tooltip"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   perkId: string
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class WithPerkTooltip extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    perkId: PropTypes.string.isRequired,
    children: PropTypes.node,
  }

  getContent() {
    const perk = findObject(this.props.perkId)
    return <div className={classnames(css.container, this.props.className)}>
      <div className={css.banner}>
        <PerkImage className={css.icon} height="3em" perkId={perk.id} noTooltip/>
        <div className={css.info}>
          {perk.title}
        </div>
      </div>
      <div className={css.effect}>
        <RichText>{replaceString(perk.richEffect, "{this}", perk.title)}</RichText>
      </div>
    </div>
  }

  render() {
    return <Tooltip html={this.getContent()} minWidth={300} noPadding>
      {this.props.children}
    </Tooltip>
  }

}