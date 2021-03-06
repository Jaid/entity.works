import classnames from "classnames"
import filterNil from "filter-nil"
import {isEmpty} from "has-content"
import {sortBy, uniq} from "lodash"
import PropTypes from "prop-types"
import React from "react"

import findObject from "lib/findObject"
import Item from "lib/Item"
import Perk from "lib/Perk"
import Survivor from "lib/Survivor"
import AddOnBox from "src/components/AddOnBox"
import AddOnImage from "src/components/AddOnImage"
import ItemBox from "src/components/ItemBox"
import OfferingBox from "src/components/OfferingBox"
import PerkBox from "src/components/PerkBox"
import PerkImage from "src/components/PerkImage"
import PerkLink from "src/components/PerkLink"
import PerkList from "src/components/PerkList"
import PowerImage from "src/components/PowerImage"
import RichText from "src/components/RichText"
import SurvivorBox from "src/components/SurvivorBox"

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
export default class BuildSurvivorLoadoutContent extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    data: PropTypes.object,
  }

  getSurvivorBox(survivor) {
    if (!survivor) {
      return null
    }
    return <div className={css.survivorBox}>
      <SurvivorBox survivor={survivor.id}/>
    </div>
  }

  getItem() {
    const item = Item.find(this.props.data.item)
    if (!item) {
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
      <ItemBox itemId={item.id}/>
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
    let survivor
    if (this.props.data.survivor) {
      survivor = Survivor.find(this.props.data.survivor)
    }
    return <div className={classnames(css.container, this.props.className)}>
      <div className={css.content}>
        <div>
          {this.getPerks()}
        </div>
        <div>
          {this.getSurvivorBox(survivor)}
          {this.getItem()}
          {this.getOffering()}
        </div>
      </div>
      {this.getDescription()}
    </div>
  }

}