import PropTypes from "prop-types"
import React from "react"

import css from "./style.scss"

export default class FlavorText extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    content: PropTypes.string.isRequired,
  }

  render() {
    return <span className={css.container}>
      {this.props.content}
    </span>
  }

}