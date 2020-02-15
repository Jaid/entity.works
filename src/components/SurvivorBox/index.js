import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import Survivor from "lib/Survivor"
import SurvivorImage from "components/SurvivorImage"
import SurvivorLink from "components/SurvivorLink"

import css from "./style.scss"

export default class SurvivorBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    imageClassName: PropTypes.string,
    survivor: PropTypes.string.isRequired,
    large: PropTypes.bool,
    inline: PropTypes.bool,
  }

  static defaultProps = {
    large: false,
    inline: true,
  }

  render() {
    const survivor = Survivor.find(this.props.survivor)
    return <span className={classnames(css.container, this.props.className, {
      [css.large]: this.props.large,
      [css.inline]: this.props.inline,
    })}>
      <SurvivorImage className={classnames(css.icon, this.props.imageClassName)} survivorId={survivor.id}/>
      <SurvivorLink info={survivor}>{survivor.shortTitle}</SurvivorLink>
    </span>
  }

}