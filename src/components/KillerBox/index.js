import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import killers from "src/data/killers?aot"

import css from "./style.scss"

export default class KillerBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    killer: PropTypes.string.isRequired,
  }

  render() {
    const info = killers.find(({id}) => id === this.props.killer)
    return <span className={classnames(css.container, this.props.className)}>
      <img className={css.icon} src={require(`../../data/killers/${this.props.killer}/icon.png`)}/>
      {info.title}
    </span>
  }

}