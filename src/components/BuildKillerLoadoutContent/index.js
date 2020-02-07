import classnames from "classnames"
import filterNil from "filter-nil"
import {uniq} from "lodash"
import PropTypes from "prop-types"
import React from "react"

import Killer from "lib/Killer"
import AddOnBox from "components/AddOnBox"
import AddOnImage from "components/AddOnImage"
import KillerBox from "components/KillerBox"
import OfferingBox from "components/OfferingBox"
import PowerImage from "components/PowerImage"
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
    return <div className={css.title}>
      <KillerBox killer={killer.id}/>
    </div>
  }

  getPower(killer) {
    if (!killer) {
      return null
    }
    const addOnIds = uniq(filterNil([this.props.data.addOn1, this.props.data.addOn2]))
    const addOnElements = addOnIds.map(id => {
      return <div key={id}>
        <AddOnBox addOnId={id} imageHeight="2em"/>
      </div>
    })
    return <div>
      <PowerImage height="2em" killerId={killer.id}/>{killer.powerTitle}
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
      {this.getKillerBox(killer)}
      {this.getPower(killer)}
      {this.getOffering()}
      {this.getDescription()}
    </div>
  }

}