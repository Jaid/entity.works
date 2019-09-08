import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import survivors from "lib/survivors"
import SurvivorTooltip from "components/SurvivorTooltip"
import Tooltip from "components/Tooltip"
import SurvivorLink from "components/SurvivorLink"

import css from "./style.scss"

export default class SurvivorBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    survivor: PropTypes.string.isRequired,
    large: PropTypes.bool,
    inline: PropTypes.bool,
  }

  static defaultProps = {
    large: false,
    inline: true,
  }

  render() {
    const info = survivors.find(({id}) => id === this.props.survivor)
    const content = <span className={classnames(css.container, this.props.className, {
      [css.large]: this.props.large,
      [css.inline]: this.props.inline,
    })}>
      <img className={css.icon} src={require(`../../data/survivors/${this.props.survivor}/icon.png`)}/>
      <SurvivorLink info={info}>{info.shortTitle}</SurvivorLink>
    </span>
    return <Tooltip html={<SurvivorTooltip info={info}/>} noPadding>{content}</Tooltip>
  }

}