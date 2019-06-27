import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import killers from "lib/killers"
import Tooltip from "components/Tooltip"
import KillerTooltip from "components/KillerTooltip"

import css from "./style.scss"

export default class KillerBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    killer: PropTypes.string.isRequired,
    large: PropTypes.bool,
    tooltips: PropTypes.bool,
  }

  static defaultProps = {
    large: false,
    tooltips: false,
  }

  render() {
    const info = killers.find(({id}) => id === this.props.killer)
    const content = <span className={classnames(css.container, this.props.className, css[this.props.large ? "large" : "inline"])}>
      <img className={css.icon} src={require(`../../data/killers/${this.props.killer}/icon.png`)}/>
      {this.props.large ? info.title : info.shortTitle}
    </span>
    if (this.props.tooltips || 1) {
      return <Tooltip html={<KillerTooltip info={info}/>} noPadding>{content}</Tooltip>
    } else {
      return content
    }
  }

}