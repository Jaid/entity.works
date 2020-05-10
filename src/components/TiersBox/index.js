import classnames from "classnames"
import {last} from "lodash"
import PropTypes from "prop-types"
import React from "react"

import TiersTooltip from "src/components/TiersTooltip"
import Tooltip from "src/components/Tooltip"

import css from "./style.scss"

export default class TiersBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    tiers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  render() {
    const text = this.props.tiers |> last
    const content = <Tooltip html={<TiersTooltip tiers={this.props.tiers}/>}>{text}</Tooltip>
    return <span className={classnames(css.container, this.props.className)}>
      {content}
    </span>
  }

}