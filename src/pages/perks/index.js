import classnames from "classnames"
import {capitalize} from "lodash"
import PropTypes from "prop-types"
import React from "react"
import {Helmet} from "react-helmet"

import perks from "lib/perks"
import NavigationPage from "components/NavigationPage"
import PerkBlock from "components/PerkBlock"
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
export default class PerksPage extends React.Component {

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

  render() {
    const visiblePerks = perks.filter(({visible}) => visible)
    const killerPerks = visiblePerks.filter(perk => perk.for === "killer")
    const survivorPerks = visiblePerks.filter(perk => perk.for === "survivor")
    const filteredPerks = do {
      if (this.props.match.params.type === "killer") {
        killerPerks
      } else if (this.props.match.params.type === "survivor") {
        survivorPerks
      } else {
        visiblePerks
      }
    }
    const perkBlocks = filteredPerks.map(perk => {
      return <PerkBlock key={perk.id} className={css.perkBlock} perkInfo={perk} displayOwnerBox/>
    })
    const links = [
      {
        text: `Killer (${killerPerks.length})`,
        to: "/perks/killer",
      },
      {
        text: `Survivor  (${survivorPerks.length})`,
        to: "/perks/survivor",
      },
      {
        text: `All (${visiblePerks.length})`,
        to: "/perks/all",
      },
    ]
    const pageTitle = `${capitalize(this.props.match.params.type)} Perks`
    return <main>
      <Helmet>
        <title>{pageTitle} Perks | Dead by Daylight Perks</title>
      </Helmet>
      <NavigationPage className={classnames(css.container, this.props.className)} links={links}>
        <Title>{pageTitle}</Title>
        {perkBlocks}
      </NavigationPage>
    </main>
  }

}