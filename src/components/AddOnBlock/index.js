import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import AddOn from "lib/AddOn"
import AddOnImage from "components/AddOnImage"
import AddOnLink from "components/AddOnLink"
import Headline from "components/Headline"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   addOnId: string,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class AddOnBlock extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    addOnId: PropTypes.string.isRequired,
  }

  render() {
    const addOn = AddOn.find(this.props.addOnId)
    return <div className={classnames(css.container, this.props.className)}>
      <Headline miniText={addOn.getOverTitle()} theme="addOn">{addOn.title}</Headline>
      <div className={css.content}>
        <AddOnImage addOnId={this.props.addOnId} className={css.image}/>
        <div className={css.text}>
          <AddOnLink addOnId={this.props.addOnId}>{addOn.title}</AddOnLink>
        </div>
      </div>
    </div>
  }

}