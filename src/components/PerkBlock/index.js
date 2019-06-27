import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import Headline from "components/Headline"
import RichText from "components/RichText"
import PerkLink from "components/PerkLink"
import findObject from "lib/findObject"
import KillerBox from "components/KillerBox"
import SurvivorBox from "components/SurvivorBox"
import Tooltip from "components/Tooltip"

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
    const ownerNode = do {
      const {type, info} = this.props.perkInfo.owner && findObject(this.props.perkInfo.owner)
      if (type === "killer") {
        <div className={css.owner}><KillerBox killer={info.id}/><span className={css.level}><Tooltip html={`Can be unlocked in the bloodweb of ${info.title} at level ${this.props.perkInfo.level}`}>{this.props.perkInfo.level}</Tooltip></span></div>
      } else if (type === "survivor") {
        <div className={css.owner}><SurvivorBox survivor={info.id}/><span className={css.level}><Tooltip html={`Can be unlocked in the bloodweb of ${info.title} at level ${this.props.perkInfo.level}`}>{this.props.perkInfo.level}</Tooltip></span></div>
      } else {
        ""
      }
    }
    return <div className={classnames(css.container, this.props.className)}>
      <Headline miniText="Perk" theme="yellow">{this.props.perkInfo.title}</Headline>
      <section className={css.perkInfo}>
        <img className={css.icon}
          src={require(`../../data/perks/${this.props.perkInfo.id}/icon.png`)}
          style={{
            background: `url(${require(`../../data/perkBackgrounds/${this.props.perkInfo.rarity}.png`)})`,
            backgroundSize: "contain",
          }}/>
        <div className={css.description}>
          <div className={css.basicInfo}>
            <PerkLink className={css.title} perkInfo={this.props.perkInfo}/>
            {ownerNode}
          </div>
          <RichText className={css.effect}>{this.props.perkInfo.effect}</RichText>
        </div>
      </section>
    </div>
  }

}