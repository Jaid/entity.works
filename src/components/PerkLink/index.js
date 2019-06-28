import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import {Link} from "react-router-dom"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   perkInfo: Object,
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
    perkInfo: PropTypes.object.isRequired,
  }

  render() {
    const content = this.props.perkInfo.title
    return <Link className={classnames(css.container, this.props.className)} to={`/perk/${this.props.perkInfo.linkId}`}>
      {content}
    </Link>
  }

}