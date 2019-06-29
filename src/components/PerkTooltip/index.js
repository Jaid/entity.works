import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import RichText from "components/RichText"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   info: Object
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class PerkTooltip extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    info: PropTypes.object.isRequired,
  }

  render() {
    return <div className={classnames(css.container, this.props.className)}>
      <RichText>{this.props.info.effect.replace("{this}", this.props.info.title)}</RichText>
    </div>
  }

}