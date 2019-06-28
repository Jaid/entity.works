import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import perks from "lib/perks"
import PerkBlock from "components/PerkBlock"
import NavigationPage from "components/NavigationPage"
import {capitalize} from "lodash"
import DocumentTitle from "react-document-title"

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
    const filteredPerks = do {
      if (this.props.match.params.type === "killer") {
        visiblePerks.filter(perk => perk.for === "killer")
      } else if (this.props.match.params.type === "survivor") {
        visiblePerks.filter(perk => perk.for === "survivor")
      } else {
        visiblePerks
      }
    }
    const perkBlocks = filteredPerks.map(perk => {
      return <PerkBlock key={perk.id} className={css.perkBlock} perkInfo={perk}/>
    })
    const links = [
      {
        text: "Killers",
        to: "/perks/killer",
      },
      {
        text: "Survivors",
        to: "/perks/survivor",
      },
    ]
    return <DocumentTitle title={`${this.props.match.params.type |> capitalize} perks in Dead by Daylight`}>
      <NavigationPage className={classnames(css.container, this.props.className)} links={links}>
        {perkBlocks}
      </NavigationPage>
    </DocumentTitle>
  }

}