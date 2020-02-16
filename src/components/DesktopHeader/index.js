import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import Picture from "react-modern-picture"
import {Link} from "react-router-dom"

import icon from "root/icon.png"

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
export default class DesktopHeader extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    children: PropTypes.node,
  }

  render() {
    return <div className={classnames(css.container, this.props.className)}>
      <div className={css.titleBox}>
        <Picture className={css.icon} input={icon}/>
        <Link className={css.title} to="/"><span className={css.entity}>Entity</span><span className={css.works}>Works</span></Link>
      </div>
      <nav className={css.nav}>
        {this.props.children}
      </nav>
    </div>
  }

}