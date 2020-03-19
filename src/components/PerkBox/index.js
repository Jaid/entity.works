import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import {findPerk} from "lib/findObject"
import PerkImage from "components/PerkImage"
import PerkLink from "components/PerkLink"
import PerkTooltip from "components/PerkTooltip"
import Tooltip from "components/Tooltip"

import css from "./style.scss"

export default class PerkBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    imageClassName: PropTypes.string,
    perkId: PropTypes.string.isRequired,
    heightEm: PropTypes.number,
  }

  static defaultProps = {
    heightEm: 1.5,
  }

  render() {
    const perk = findPerk(this.props.perkId)
    const style = {
      marginRight: `${this.props.heightEm / 4}em`,
      marginTop: `${-this.props.heightEm / 2}em`,
      marginBottom: `${-this.props.heightEm / 2}em`,
    }
    return <span className={classnames(css.container, this.props.className)}>
      <PerkImage className={classnames(css.icon, this.props.imageClassName)} height={`${this.props.heightEm}em`} perkId={perk.id} style={style}/>
      <PerkLink perkId={perk.id}/>
    </span>
  }

}