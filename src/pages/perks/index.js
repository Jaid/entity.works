import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import perks from "lib/perks"
import PerkBlock from "components/PerkBlock"

import css from "./style.scss"

/**
  * @typedef {{
  *  className: *,
  *  match: {
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
export default class PerksPage extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    match: PropTypes.exact({
      isExact: PropTypes.bool.isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      params: PropTypes.object,
    }).isRequired,
  }

  render() {
    const perkBlocks = perks.map(perk => {
      return <PerkBlock key={perk.id} className={css.perkBlock} perkInfo={perk}/>
    })
    return <main className={classnames(css.container, this.props.className)}>
      {perkBlocks}
    </main>
  }

}