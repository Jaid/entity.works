import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import Headline from "components/Headline"
import RichText from "components/RichText"
import {Link} from "react-router-dom"

import css from "./style.scss"

/**
  * @typedef {{
  *  className: *,
  *  perkInfo: Object,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class PerkBlock extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    perkInfo: PropTypes.object.isRequired,
  }

  render() {
    return <div className={classnames(css.container, this.props.className)}>
      <Headline miniText="Perk" theme="yellow">{this.props.perkInfo.title}</Headline>
      <section className={css.perkInfo}>
        <Link to={`/perk/${this.props.perkInfo.id}`}>
          <img className={css.icon}
            src={require(`../../data/perks/${this.props.perkInfo.id}/icon.png`)}
            style={{
              background: `url(${require(`../../data/perkBackgrounds/${this.props.perkInfo.rarity}.png`)})`,
              backgroundSize: "contain",
            }}/>
        </Link>
        <div className={css.description}>
          <Link className={css.title} to={`/perk/${this.props.perkInfo.id}`}>{this.props.perkInfo.title}</Link>
          <RichText className={css.effect}>{this.props.perkInfo.effect}</RichText>
        </div>
      </section>
    </div>
  }

}