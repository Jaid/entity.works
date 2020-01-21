import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import replaceString from "replace-string"

import findObject from "lib/findObject"
import Headline from "components/Headline"
import KillerBox from "components/KillerBox"
import PerkImage from "components/PerkImage"
import PerkLink from "components/PerkLink"
import RichText from "components/RichText"
import SurvivorBox from "components/SurvivorBox"
import Tooltip from "components/Tooltip"

import css from "./style.scss"

/**
  * @typedef {{
  *  className: *,
  *  perkInfo: Object,
  *  displayOwnerBox: boolean
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
    displayOwnerBox: PropTypes.bool,
  }

  render() {
    const getOwnerInfo = () => {
      const ownerObject = this.props.perkInfo.owner && findObject(this.props.perkInfo.owner)
      if (ownerObject.type === "killer") {
        return {
          ownerObject,
          box: <KillerBox killer={ownerObject.id}/>,
        }
      } else if (ownerObject.type === "survivor") {
        return {
          ownerObject,
          box: <SurvivorBox survivor={ownerObject.id}/>,
        }
      }
    }
    const getOwnerNode = () => {
      const ownerInfo = getOwnerInfo()
      if (ownerInfo) {
        const tooltip = `Teachable version of {${this.props.perkInfo.id}} can be unlocked in the bloodweb of {${ownerInfo.id}} at level ${this.props.perkInfo.level}`
        return <div className={css.owner}>
          {this.props.displayOwnerBox && ownerInfo.box}
          <span className={css.level}>
            <Tooltip html={<RichText className={css.ownerBoxTooltip}>{tooltip}</RichText>}>
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
        <PerkImage className={css.icon} perkId={this.props.perkInfo.id}/>
        <div className={css.description}>
          <div className={css.basicInfo}>
            <PerkLink className={css.title} perkInfo={this.props.perkInfo}/>
            {getOwnerNode()}
          </div>
          <RichText className={css.effect}>
            {replaceString(this.props.perkInfo.effect, "{this}", `{${this.props.perkInfo.id}}`)}
          </RichText>
        </div>
      </section>
    </div>
  }

}