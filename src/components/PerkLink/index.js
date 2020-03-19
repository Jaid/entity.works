import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import {Link} from "react-router-dom"

import findObject from "lib/findObject"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   perkId: string,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class PerkLink extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    perkId: PropTypes.string.isRequired,
  }

  render() {
    const perk = findObject(this.props.perkId)
    const content = perk.title
    return <Link className={classnames(css.container, this.props.className)} to={`/perk/${perk.linkId}`}>
      {content}
    </Link>
  }

}