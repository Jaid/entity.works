import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import {last} from "lodash"

import css from "./style.scss"

export default class TiersBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    tiers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  render() {
    return <span className={classnames(css.container, this.props.className)}>
      {this.props.tiers |> last}
    </span>
  }

}