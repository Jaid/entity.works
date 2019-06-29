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
    const getOwnerInfo = () => {
      const {type, info} = this.props.perkInfo.owner && findObject(this.props.perkInfo.owner)
      if (type === "killer") {
        return {
          info,
          box: <KillerBox killer={info.id}/>,
        }
      } else if (type === "survivor") {
        return {
          info,
          box: <SurvivorBox survivor={info.id}/>,
        }
      }
    }
    const getOwnerNode = () => {
      const ownerInfo = getOwnerInfo()
      if (ownerInfo) {
        const tooltip = `Teachable version of {${this.props.perkInfo.id}} can be unlocked in the bloodweb of {${ownerInfo.info.id}} at level ${this.props.perkInfo.level}`
        return <div className={css.owner}>
          {ownerInfo.box}
          <span className={css.level}>
            <Tooltip html={<RichText>{tooltip}</RichText>}>
              <i className={classnames("fa", "fa-unlock-alt", css.lockIcon)}/>
              {this.props.perkInfo.level}
            </Tooltip>
          </span>
        </div>
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
            {getOwnerNode()}
          </div>
          <RichText className={css.effect}><RichText className={css.effect}>{this.props.perkInfo.effect.replace("{this}", `{${this.props.perkInfo.id}}`)}</RichText></RichText>
        </div>
      </section>
    </div>
  }

}

//           <RichText className={css.effect}>{this.props.perkInfo.effect.replace("{this}", `{${this.props.perkInfo.id}}`)}</RichText>