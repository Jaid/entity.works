import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import replaceString from "replace-string"

import findObject from "lib/findObject"
import Headline from "src/components/Headline"
import OfferingImage from "src/components/OfferingImage"
import OfferingLink from "src/components/OfferingLink"
import RichText from "src/components/RichText"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   offeringId: string,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class OfferingBlock extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    offeringId: PropTypes.string.isRequired,
  }

  render() {
    const offering = findObject(this.props.offeringId)
    return <div className={classnames(css.container, this.props.className)}>
      <Headline miniText={offering.overTitle} theme="offering">{offering.title}</Headline>
      <div className={css.content}>
        <OfferingImage className={css.image} offeringId={this.props.offeringId}/>
        <div className={css.text}>
          <OfferingLink offeringId={this.props.offeringId}>{offering.title}</OfferingLink>
          <RichText className={css.effect}>
            {replaceString(offering.richEffect, "{this}", `{${offering.id}}`)}
          </RichText>
        </div>
      </div>
    </div>
  }

}