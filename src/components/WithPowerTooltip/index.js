import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import replaceString from "replace-string"

import findObject from "lib/findObject"
import KillerImage from "src/components/KillerImage"
import PowerImage from "src/components/PowerImage"
import RichText from "src/components/RichText"
import Tooltip from "src/components/Tooltip"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   killerId: string
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class WithPowerTooltip extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    killerId: PropTypes.string.isRequired,
    children: PropTypes.node,
  }

  prepareRichText(killer) {
    return replaceString(killer.richEffect, "{this}", killer.powerTitle)
  }

  getContent() {
    const killer = findObject(this.props.killerId)
    return <div className={classnames(css.container, this.props.className)}>
      <div className={css.banner}>
        <PowerImage className={css.icon} height="3em" killerId={killer.id} noTooltip/>
        <div className={css.info}>
          {killer.powerTitle}
        </div>
      </div>
      <div className={css.effect}>
        <RichText>{this.prepareRichText(killer)}</RichText>
      </div>
    </div>
  }

  render() {
    return <Tooltip html={this.getContent()} noPadding>
      {this.props.children}
    </Tooltip>
  }

}