import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import {Helmet} from "react-helmet"
import zahl from "zahl"

import Killer from "lib/Killer"
import Perk from "lib/Perk"
import Survivor from "lib/Survivor"
import KillerBox from "src/components/KillerBox"
import PerkBox from "src/components/PerkBox"
import SurvivorBox from "src/components/SurvivorBox"
import Title from "src/components/Title"

import css from "./style.scss"

const characterGroups = {
  killers: {
    title: "Killer",
    list: Killer.allVisible,
    Box: KillerBox,
    boxKey: "killer",
  },
  survivors: {
    title: "Survivor",
    list: Survivor.allVisible,
    Box: SurvivorBox,
    boxKey: "survivor",
  },
}

/**
  * @typedef {{
  *   match: {
  *    isExact: boolean
  *    path: string
  *    url: string
  *    params: object.<string, string>
  *  },
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class CharactersPage extends React.Component {

  static propTypes = {
    match: PropTypes.exact({
      isExact: PropTypes.bool.isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      params: PropTypes.object,
    }).isRequired,
  }

  render() {
    const selectedCharacterGroups = Object.entries(characterGroups)
    const characterGroupNodes = selectedCharacterGroups.map(([id, {list, title, Box, boxKey}]) => [
      <tr key={id}>
        <td className={css.listTitle} colSpan={4}>{zahl(list, title)}</td>
      </tr>,
      list.map(character => <tr key={character.id} className={classnames(css.characterEntry, css[id])}>
        <td>
          <Box className={css.characterBox} imageClassName={css.characterBoxImage} inline={false} {...{[boxKey]: character.id}}/>
        </td>
        {Perk.findByOwner(character.id).map(perk => <td key={perk.level} className={css.perkCell}>
          <PerkBox className={css.perkBox} heightEm={2.5} imageClassName={css.perkBoxImage} inline={false} perkId={perk.id}/>
        </td>)}
      </tr>),
    ])
    return <main>
      <Helmet>
        <title>Characters and Perks Overview | Dead by Daylight</title>
      </Helmet>
      <Title>Characters</Title>
      <table className={css.characterList}>
        <tbody>{characterGroupNodes}</tbody>
      </table>
    </main>
  }

}