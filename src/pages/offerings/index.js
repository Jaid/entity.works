import classnames from "classnames"
import {capitalize} from "lodash"
import PropTypes from "prop-types"
import React from "react"
import {Helmet} from "react-helmet"

import Offering from "lib/Offering"
import NavigationPage from "components/NavigationPage"
import OfferingBlock from "components/OfferingBlock"
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
export default class OfferingsPage extends React.Component {

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

  getOfferingList() {
    if (this.props.match.params.type === "killer") {
      return Offering.forKiller
    } else if (this.props.match.params.type === "survivor") {
      return Offering.forSurvivor
    } else if (this.props.match.params.type === "survivor-exclusive") {
      return Offering.forSurvivorExclusive
    } else if (this.props.match.params.type === "killer-exclusive") {
      return Offering.forKillerExclusive
    } else {
      return Offering.allVisible
    }
  }

  render() {
    const offeringBlocks = this.getOfferingList().map(offering => {
      return <OfferingBlock key={offering.id} className={css.offeringBlock} offeringId={offering.id}/>
    })
    const links = [
      {
        text: `Killer (${Offering.forKiller.length})`,
        to: "/offerings/killer",
      },
      {
        text: `Killer only (${Offering.forKillerExclusive.length})`,
        to: "/offerings/killer-exclusive",
      },
      {
        text: `Survivor  (${Offering.forSurvivor.length})`,
        to: "/offerings/survivor",
      },
      {
        text: `Survivor only (${Offering.forSurvivorExclusive.length})`,
        to: "/offerings/survivor-exclusive",
      },
      {
        text: `All (${Offering.allVisible.length})`,
        to: "/offerings/all",
      },
    ]
    const pageTitle = `${capitalize(this.props.match.params.type)} Offerings`
    return <main>
      <Helmet>
        <title>{pageTitle} | Dead by Daylight Offering List</title>
      </Helmet>
      <NavigationPage className={classnames(css.container, this.props.className)} links={links}>
        <Title>{pageTitle}</Title>
        {offeringBlocks}
      </NavigationPage>
    </main>
  }

}