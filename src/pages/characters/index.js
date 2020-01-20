import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import {Helmet} from "react-helmet"
import zahl from "zahl"

import killers from "lib/killers"
import {perksByOwner} from "lib/perks"
import survivors from "lib/survivors"
import KillerBox from "components/KillerBox"
import PerkBox from "components/PerkBox"
import SurvivorBox from "components/SurvivorBox"

import css from "./style.scss"

const characterGroups = {
  killers: {
    title: "Killer",
    list: killers,
    Box: KillerBox,
    boxKey: "killer",
  },
  survivors: {
    title: "Survivor",
    list: survivors,
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
          <Box className={css.characterBox} inline={false} {...{[boxKey]: character.id}}/>
        </td>
        {perksByOwner(character.id).map(perk => <td key={perk.level} className={css.perkCell}>
          <PerkBox className={css.perkBox} inline={false} perk={perk.id}/>
        </td>)}
      </tr>),
    ])
    return <main>
      <Helmet>
        <title>Characters and Perks | Dead by Daylight</title>
      </Helmet>
      <table className={css.characterList}>
        <tbody>{characterGroupNodes}</tbody>
      </table>
    </main>
  }

}