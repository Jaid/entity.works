import React from "react"
import PropTypes from "prop-types"
import SurvivorBox from "components/SurvivorBox"
import KillerBox from "components/KillerBox"
import PerkBox from "components/PerkBox"

export default class RichBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    name: PropTypes.string,
    info: PropTypes.object,
  }

  static defaultProps = {
  }

  render() {
    if (this.props.type === "survivor") {
      const id = this.props.name || this.props.info.id
      return <SurvivorBox className={this.props.className} survivor={id}/>
    }
    if (this.props.type === "killer") {
      const id = this.props.name || this.props.info.id
      return <KillerBox className={this.props.className} killer={id}/>
    }
    if (this.props.type === "perk") {
      const id = this.props.name || this.props.info.id
      return <PerkBox className={this.props.className} perk={id}/>
    }
  }

}