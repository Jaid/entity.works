import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import {NavLink} from "react-router-dom"

import css from "./style.scss"

/**
  * @typedef {{
  *  className: *,
  *  navigationClassName: *,
  *  contentClassName: *,
  *  children: *,
  *  links: Object[],
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class NavigationPage extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    navigationClassName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    contentClassName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    children: PropTypes.node.isRequired,
    links: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    const linkNodes = this.props.links.map(({text, to}) => {
      return <NavLink key={text} activeClassName={css.activeLink} className={css.link} to={to}>{text}</NavLink>
    })
    return <main className={classnames(css.container, this.props.className)}>
      <nav className={classnames(css.navigation, this.props.navigationClassName)}>{linkNodes}</nav>
      <section className={classnames(css.content, this.props.contentClassName)}>{this.props.children}</section>
    </main>
  }

}