import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import RichText from "src/components/RichText"
import Title from "src/components/Title"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class RichTitle extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    children: PropTypes.node,
  }

  render() {
    return <Title className={classnames(this.props.className, css.container)}>
      <RichText>
        {this.props.children}
      </RichText>
    </Title>
  }

}