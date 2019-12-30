import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import {NavLink} from "react-router-dom"
import Sticky from "wil-react-sticky"

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

  getDesktopNavigation() {
    const linkNodes = this.props.links.map(({text, to}) => {
      return <NavLink key={text} activeClassName={css.activeLink} className={css.link} to={to}>{text}</NavLink>
    })
    return <div className={css.desktopNavigation}>
      <Sticky>
        <nav className={classnames(css.navigation, this.props.navigationClassName)}>{linkNodes}</nav>
      </Sticky>
    </div>
  }

  getMobileNavigation() {
    const linkNodes = this.props.links.map(({text, to}) => {
      return <NavLink key={text} activeClassName={css.activeLink} className={css.link} to={to}>{text}</NavLink>
    })
    return <nav className={css.mobileNavigationContainer}>
      <div className={css.mobileNavigation}>
        {linkNodes}
      </div>
    </nav>
  }

  render() {
    return <main className={classnames(css.container, this.props.className)}>
      {this.getDesktopNavigation()}
      {this.getMobileNavigation()}
      <section className={classnames(css.content, this.props.contentClassName)}>{this.props.children}</section>
    </main>
  }

}