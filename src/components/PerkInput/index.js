import classnames from "classnames"
import {isEmpty} from "has-content"
import PropTypes from "prop-types"
import React from "react"

import collator from "lib/collator"
import Perk from "lib/Perk"
import PerkImage from "components/PerkImage"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   title: string,
  *   name: string,
  *   onlyKillerPerks: boolean,
  *   onlySurvivorPerks: boolean
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class PerkInput extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    title: PropTypes.string,
    name: PropTypes.string.isRequired,
    onlyKillerPerks: PropTypes.bool,
    onlySurvivorPerks: PropTypes.bool,
    input: PropTypes.any.isRequired,
  }

  getPerkList() {
    if (this.props.onlyKillerPerks) {
      return Perk.forKiller
    }
    if (this.props.onlySurvivorPerks) {
      return Perk.forSurvivor
    }
    return Perk.allVisible
  }

  getImage() {
    if (isEmpty(this.props.input.value)) {
      return <span className={css.iconPlaceholder}/>
    }
    return <PerkImage height="2.5em" perkId={this.props.input.value}/>
  }

  render() {
    const perkList = [...this.getPerkList()]
    perkList.sort((perk1, perk2) => {
      return collator.compare(perk1.title, perk2.title)
    })
    const options = perkList.map(perk => {
      return <option key={perk.id} value={perk.id}>{perk.title}</option>
    })
    return <div className={classnames(css.container, this.props.className)}>
      <div>
        <div>
          {this.props.title}
        </div>
        <select onChange={this.props.input.onChange.bind(this)}>
          <option value="">(none)</option>
          {options}
        </select>
      </div>
      {this.getImage()}
    </div>
  }

}