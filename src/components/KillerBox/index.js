import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import killers from "lib/killers"

import css from "./style.scss"

export default class KillerBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    killer: PropTypes.string.isRequired,
    large: PropTypes.bool,
  }

  static defaultProps = {
    large: false,
  }

  render() {
    const info = killers.find(({id}) => id === this.props.killer)
    return <span className={classnames(css.container, this.props.className, css[this.props.large ? "large" : "inline"])}>
      <img className={css.icon} src={require(`../../data/killers/${this.props.killer}/icon.png`)}/>
      {info.title}
    </span>
  }

}