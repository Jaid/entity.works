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
  *  perkId: string,
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
    perkId: PropTypes.string.isRequired,
    displayOwnerBox: PropTypes.bool,
  }

  render() {
    const perk = findObject(this.props.perkId)
    const getOwnerInfo = () => {
      const ownerObject = perk.owner && findObject(perk.owner)
      if (!ownerObject) {
        return null
      }
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
        const tooltip = `Teachable version of {${perk.id}} can be unlocked in the bloodweb of {${ownerInfo.id}} at level ${perk.level}`
        return <div className={css.owner}>
          {this.props.displayOwnerBox && ownerInfo.box}
          <span className={css.level}>
            <Tooltip html={<RichText className={css.ownerBoxTooltip}>{tooltip}</RichText>}>
              <i className={classnames("fa", "fa-unlock-alt", css.lockIcon)}/>
              {perk.level}
            </Tooltip>
          </span>
        </div>
      }
    }
    return <div className={classnames(css.container, this.props.className)}>
      <Headline miniText="Perk" theme="yellow">{perk.title}</Headline>
      <section className={css.perkInfo}>
        <PerkImage className={css.icon} perkId={perk.id}/>
        <div className={css.description}>
          <div className={css.basicInfo}>
            <PerkLink className={css.title} perkId={perk.id}/>
            {getOwnerNode()}
          </div>
          <RichText className={css.effect}>
            {replaceString(perk.richEffect, "{this}", `{${perk.id}}`)}
          </RichText>
        </div>
      </section>
    </div>
  }

}