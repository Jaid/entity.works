import classnames from "classnames"
import {isEmpty} from "has-content"
import PropTypes from "prop-types"
import React from "react"

import PerkImage from "components/PerkImage"
import PerkLink from "components/PerkLink"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class PerkList extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    perkIds: PropTypes.array,
  }

  render() {
    if (isEmpty(this.props.perkIds)) {
      return null
    }
    const perkElements = this.props.perkIds.map(id => {
      return <div key={id} className={css.perk}>
        <PerkImage height="3em" perkId={id}/>
        <PerkLink perkId={id}/>
      </div>
    })
    return <div className={classnames(css.container, this.props.className)}>
      {perkElements}
    </div>
  }

}