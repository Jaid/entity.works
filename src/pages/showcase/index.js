import {uniq} from "lodash"
import PropTypes from "prop-types"
import React from "react"
import {Link} from "react-router-dom"

import findObject from "lib/findObject"
import Perk from "lib/Perk"
import PerkImage from "components/PerkImage"
import PerkLink from "components/PerkLink"

import css from "./style.scss"

/**
  * @typedef {Object} Props
  * @prop {Object} match
  * @prop {boolean} match.isExact
  * @prop {string} match.path
  * @prop {string} match.url
  * @prop {Object} match.params
  * @prop {string} match.params.build
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class ShowcasePage extends React.Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  getPerk(perk) {
    return <span className={css.perk}>
      <PerkImage className={css.perkImage} perkId={perk.id}/>
      <PerkLink className={css.perkLink} perkId={perk.id}/>
    </span>
  }

  render() {
    if (!this.props.match.params.build) {
      return <div>
        <div>
          No build given.
        </div>
        <Link to="/showcase/unbreakable,selfCare,adrenaline,wellMakeIt">Example</Link>
      </div>
    }
    const objectIds = uniq(this.props.match.params.build.split(","))
    const objects = objectIds.map(findObject)
    const perks = objects.filter(object => object.type === "perk")
    const sortedPerks = Perk.sortByTitle(perks)
    return <main className={css.container}>
      <div id="showcase">
        <div className={css.perks}>
          {sortedPerks.map(this.getPerk)}
        </div>
      </div>
    </main>
  }

}