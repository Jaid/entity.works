import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import {elastic as BurgerMenu} from "react-burger-menu"
import Picture from "react-modern-picture"
import {Link} from "react-router-dom"

import appCss from "components/App/style.scss"

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
export default class MobileHeader extends React.Component {

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
    return <div className={classnames(this.props.className)} id={css.container}>
      <BurgerMenu burgerBarClassName={css.burgerBar} burgerButtonClassName={css.burgerButton} crossButtonClassName={css.burgerCross} crossClassName={css.burgerCrossIcon} itemListClassName={css.burgerItemList} menuClassName={css.burgerBody} outerContainerId={css.container} pageWrapId={appCss.containerWithId} disableAutoFocus right>
        {this.props.children}
      </BurgerMenu>
      <div className={css.titleBox}>
        <Picture className={css.icon} input={icon}/>
        <Link className={css.title} to="/"><span className={css.entity}>Entity</span><span className={css.works}>Works</span></Link>
      </div>
    </div>
  }

}