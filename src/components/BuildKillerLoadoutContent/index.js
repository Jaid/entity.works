import classnames from "classnames"
import filterNil from "filter-nil"
import {isEmpty} from "has-content"
import {sortBy, uniq} from "lodash"
import PropTypes from "prop-types"
import React from "react"

import findObject from "lib/findObject"
import Killer from "lib/Killer"
import AddOnBox from "components/AddOnBox"
import KillerBox from "components/KillerBox"
import KillerImage from "components/KillerImage"
import KillerLink from "components/KillerLink"
import OfferingBox from "components/OfferingBox"
import PerkBox from "components/PerkBox"
import PerkImage from "components/PerkImage"
import PerkLink from "components/PerkLink"
import PerkList from "components/PerkList"
import RichText from "components/RichText"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class BuildKillerLoadoutContent extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    data: PropTypes.object,
  }

  getKillerBox(killer) {
    if (!killer) {
      return null
    }
    return <div className={css.killerBox}>
      <KillerLink info={killer}>{killer.shortTitle}</KillerLink>
      <KillerImage className={css.killerImage} killerId={killer.id}/>
    </div>
  }

  getPower(killer) {
    if (!killer) {
      return null
    }
    const addOnsInput = [
      this.props.data.addOn1,
      this.props.data.addOn2,
    ]
    const addOnIds = sortBy(uniq(filterNil(addOnsInput)))
    const addOnElements = addOnIds.map(id => {
      return <div key={id}>
        <AddOnBox addOnId={id} imageHeight="2em"/>
      </div>
    })
    return <div>
      {addOnElements}
    </div>
  }

  getOffering() {
    if (!this.props.data.offering) {
      return null
    }
    return <div>
      <OfferingBox offeringId={this.props.data.offering}/>
    </div>
  }

  getPerks() {
    const perksInput = [
      this.props.data.perk1,
      this.props.data.perk2,
      this.props.data.perk3,
      this.props.data.perk4,
    ]
    const perkIds = sortBy(uniq(filterNil(perksInput)))
    return <PerkList perkIds={perkIds}/>
  }

  getDescription() {
    if (!this.props.data.description) {
      return null
    }
    return <div className={css.description}>
      <RichText>{this.props.data.description}</RichText>
    </div>
  }

  render() {
    if (!this.props.data) {
      return null
    }
    let killer
    if (this.props.data.killer) {
      killer = Killer.find(this.props.data.killer)
    }
    return <div className={classnames(css.container, this.props.className)}>
      <div className={css.content}>
        <div>
          {this.getPerks()}
        </div>
        <div>
          {this.getKillerBox(killer)}
          {this.getPower(killer)}
          {this.getOffering()}
        </div>
      </div>
      {this.getDescription()}
    </div>
  }

}