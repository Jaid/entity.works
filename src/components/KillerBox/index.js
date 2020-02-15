import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import Killer from "lib/Killer"
import KillerImage from "components/KillerImage"
import KillerLink from "components/KillerLink"

import css from "./style.scss"

export default class KillerBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    imageClassName: PropTypes.string,
    killer: PropTypes.string.isRequired,
    large: PropTypes.bool,
    inline: PropTypes.bool,
  }

  static defaultProps = {
    large: false,
    inline: true,
  }

  render() {
    const killer = Killer.find(this.props.killer)
    return <span className={classnames(css.container, this.props.className, {
      [css.large]: this.props.large,
      [css.inline]: this.props.inline,
    })}>
      <KillerImage className={classnames(css.icon, this.props.imageClassName)} killerId={this.props.killer}/>
      <KillerLink info={killer}>{this.props.large ? killer.title : killer.shortTitle}</KillerLink>
    </span>
  }

}