import PropTypes from "prop-types"
import React from "react"
import {Link} from "react-router-dom"

import findObject from "lib/findObject"
import AddOnBox from "components/AddOnBox"
import ItemBox from "components/ItemBox"
import KillerBox from "components/KillerBox"
import OfferingBox from "components/OfferingBox"
import PatchBox from "components/PatchBox"
import PerkBox from "components/PerkBox"
import SurvivorBox from "components/SurvivorBox"

export default class RichBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    objectId: PropTypes.string.isRequired,
  }

  static defaultProps = {
  }

  render() {
    const object = findObject(this.props.objectId)
    if (object.type === "survivor") {
      return <SurvivorBox className={this.props.className} survivor={object.id}/>
    }
    if (object.type === "killer") {
      return <KillerBox className={this.props.className} killer={object.id}/>
    }
    if (object.type === "perk") {
      return <PerkBox className={this.props.className} perkId={object.id}/>
    }
    if (object.type === "patch") {
      return <PatchBox patchId={object.id}/>
    }
    if (object.type === "addOn") {
      return <AddOnBox addOnId={object.id}/>
    }
    if (object.type === "offering") {
      return <OfferingBox offeringId={object.id}/>
    }
    if (object.type === "item") {
      return <ItemBox itemId={object.id}/>
    }
    return null
  }

}