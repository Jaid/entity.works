import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import perks from "lib/perks"

import css from "./style.scss"

export default class PerkBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    perk: PropTypes.string.isRequired,
  }

  render() {
    const perkInfo = perks.find(({id}) => id === this.props.perk)
    const type = perkInfo.teachable ? "teachable" : "template"
    return <span className={classnames(css.container, this.props.className, css[type])}>
      <img className={css.background} src={require("src/data/perkBackgrounds/teachable.png")}/>
      <img className={css.icon} src={require(`../../data/perks/${this.props.perk}/icon.png`)}/>
      {perkInfo.title}
    </span>
  }

}