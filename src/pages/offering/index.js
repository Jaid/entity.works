import PropTypes from "prop-types"
import React from "react"
import {Helmet} from "react-helmet"

import {flattenRichText} from "lib/normalizeRichText"
import Offering from "lib/Offering"
import OfferingBlock from "components/OfferingBlock"
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
export default class OfferingPage extends React.Component {

  static propTypes = {
    match: PropTypes.exact({
      isExact: PropTypes.bool.isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      params: PropTypes.object,
    }).isRequired,
  }

  getFullDescription(offering) {
    return `Dead by Daylight offering ${offering.title}. ${flattenRichText(offering.richEffect, offering.title)}`
  }

  render() {
    const offering = Offering.find(this.props.match.params.id)
    if (!offering) {
      return `No offering found for "${this.props.match.params.id}".`
    }
    return <main className={css.container}>
      <Helmet>
        <title>{offering.title} | Dead by Daylight {offering.overTitle}</title>
        <meta content={this.getFullDescription(offering)} name="description"/>
      </Helmet>
      <Title>{offering.title} Offering</Title>
      <OfferingBlock offeringId={offering.id}/>
    </main>
  }

}