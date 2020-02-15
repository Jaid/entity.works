import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import replaceString from "replace-string"

import findObject from "lib/findObject"
import OfferingImage from "components/OfferingImage"
import RichText from "components/RichText"
import Tooltip from "components/Tooltip"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   offeringId: string
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class WithOfferingTooltip extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    offeringId: PropTypes.string.isRequired,
    children: PropTypes.node,
  }

  getContent() {
    const offering = findObject(this.props.offeringId)
    return <div className={classnames(css.container, this.props.className)}>
      <div className={css.banner}>
        <OfferingImage className={css.icon} height="3em" offeringId={offering.id} noTooltip/>
        <div className={css.info}>
          {offering.title}
        </div>
      </div>
      <div className={css.effect}>
        <RichText>{replaceString(offering.richEffect, "{this}", offering.title)}</RichText>
      </div>
    </div>
  }

  render() {
    return <Tooltip html={this.getContent()} minWidth={300} noPadding>
      {this.props.children}
    </Tooltip>
  }

}