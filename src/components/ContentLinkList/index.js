import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import {Link} from "react-router-dom"

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
export default class ContentLinkList extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    links: PropTypes.array.isRequired,
  }

  render() {
    const linkBoxes = this.props.links.map(({count, text, to}) => <Link key={to} className={css.linkBox} to={to}>
      <div className={css.linkBoxCount}>{count}</div>
      <div className={css.linkBoxText}>{text}</div>
    </Link>)
    return <div className={classnames(css.container, this.props.className)}>
      {linkBoxes}
    </div>
  }

}