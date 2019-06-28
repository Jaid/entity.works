import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import survivors from "lib/survivors"
import NavigationPage from "components/NavigationPage"
import killers from "lib/killers"
import Headline from "components/Headline"
import RelevantPatches from "components/RelevantPatches"

import css from "./style.scss"

const meta = {
  killer: {
    list: killers,
    referenceType: "killers",
    titleKey: "shortTitle",
    overTextKey: "fullName",
  },
  survivor: {
    list: survivors,
    referenceType: "survivors",
    titleKey: "shortTitle",
    overTextKey: "fullName",
  },
}

/**
  * @typedef {{
  *  className: *,
  *  linkId: string,
  *  type: string
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
    linkId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }

  render() {
    const myMeta = meta[this.props.type]
    const characterInfo = myMeta.list.find(({linkId}) => linkId === this.props.linkId)
    const links = myMeta.list.map(character => ({
      to: `/${this.props.type}/${character.linkId}`,
      text: character[myMeta.titleKey],
    }))
    return <NavigationPage links={links}>
      <Headline miniText={characterInfo[myMeta.overTextKey]} theme={this.props.type}>{characterInfo[myMeta.titleKey]}</Headline>
      <img src={require(`../../data/${myMeta.referenceType}/${characterInfo.id}/icon.png`)}/>
      <div>abc</div>
      <RelevantPatches name={characterInfo.id} type={myMeta.referenceType}/>
    </NavigationPage>
  }

}