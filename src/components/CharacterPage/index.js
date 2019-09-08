import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import survivors from "lib/survivors"
import NavigationPage from "components/NavigationPage"
import killers from "lib/killers"
import Headline from "components/Headline"
import RelevantPatches from "components/RelevantPatches"
import RichText from "components/RichText"
import {perksByOwner} from "lib/perks"
import PerkBlock from "components/PerkBlock"

import css from "./style.scss"

const meta = {
  killer: {
    list: killers,
    referenceType: "killers",
    navigationTitleKey: "shortTitle",
    titleKey: "title",
    overTextKey: "fullName",
  },
  survivor: {
    list: survivors,
    referenceType: "survivors",
    navigationTitleKey: "shortTitle",
    titleKey: "title",
    overText: "Survivor",
  },
}

/**
  * @typedef {{
  *  className: *,
  *  type: string
  *  info: Object,
  *  description: string
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class CharacterPage extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    type: PropTypes.string.isRequired,
    info: PropTypes.object.isRequired,
    description: PropTypes.string,
  }

  render() {
    const myMeta = meta[this.props.type]
    const links = myMeta.list.map(character => ({
      to: `/${this.props.type}/${character.linkId}`,
      text: character[myMeta.navigationTitleKey],
    }))
    const ownPerks = perksByOwner(this.props.info.id)
    const perkNodes = ownPerks.map(perk => {
      return <PerkBlock key={perk.id} className={css.perk} perkInfo={perk}/>
    })
    return <NavigationPage links={links}>
      <Headline miniText={myMeta.overText || this.props.info[myMeta.overTextKey]} theme={this.props.type}>
        {this.props.info[myMeta.titleKey]}
      </Headline>
      <div className={css.introduction}>
        <img className={css.icon} src={require(`../../data/${myMeta.referenceType}/${this.props.info.id}/icon.png`)}/>
        <RichText className={css.description}>{this.props.description}</RichText>
      </div>
      {perkNodes}
      <RelevantPatches name={this.props.info.id} type={myMeta.referenceType}/>
    </NavigationPage>
  }

}