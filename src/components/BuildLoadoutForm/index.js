import React from "react"
import PropTypes from "prop-types"
import css from "./style.scss"
import classnames from "classnames"

/**
  * @typedef {{
  *   className: *,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class BuildLoadoutForm extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
  }

  render() {
    const content = <span>Component BuildLoadoutForm</span>
    return <div className={classnames(css.container, this.props.className)}>
      {content}
    </div>
  }

}