import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import replaceString from "replace-string"

import AddOn from "lib/AddOn"
import AddOnImage from "src/components/AddOnImage"
import AddOnLink from "src/components/AddOnLink"
import Headline from "src/components/Headline"
import RichText from "src/components/RichText"

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
          <RichText className={css.effect}>
            {replaceString(addOn.richEffect, "{this}", `{${addOn.id}}`)}
          </RichText>
        </div>
      </div>
    </div>
  }

}