import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import killers from "lib/killers"
import KillerLink from "components/KillerLink"
import KillerTooltip from "components/KillerTooltip"
import Tooltip from "components/Tooltip"

import css from "./style.scss"

export default class KillerBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    killer: PropTypes.string.isRequired,
    large: PropTypes.bool,
    inline: PropTypes.bool,
  }

  static defaultProps = {
    large: false,
    inline: true,
  }

  render() {
    const info = killers.find(({id}) => id === this.props.killer)
    const content = <span className={classnames(css.container, this.props.className, {
      [css.large]: this.props.large,
      [css.inline]: this.props.inline,
    })}>
      <img className={css.icon} src={require(`../../data/killers/${this.props.killer}/icon.png`)}/>
      <KillerLink info={info}>{this.props.large ? info.title : info.shortTitle}</KillerLink>
    </span>
    return <Tooltip html={<KillerTooltip info={info}/>} noPadding>{content}</Tooltip>
  }

}