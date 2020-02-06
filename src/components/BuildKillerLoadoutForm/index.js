import classnames from "classnames"
import {isEmpty} from "has-content"
import PropTypes from "prop-types"
import React from "react"
import {connect} from "react-redux"
import {Field} from "redux-form"

import Killer from "lib/Killer"
import AddOnInput from "components/AddOnInput"
import KillerInput from "components/KillerInput"
import PerkInput from "components/PerkInput"
import PowerImage from "components/PowerImage"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  * }} Props
  */

@connect(({form}) => ({
  killer: form.build?.values?.killer,
}))

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class BuildKillerLoadoutForm extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    killer: PropTypes.string,
    change: PropTypes.func.isRequired,
  }

  getAddOnFields() {
    const killer = Killer.find(this.props.killer)
    if (!killer) {
      return null
    }
    return <div className={css.addOnFields}>
      <PowerImage className={css.powerIcon} height="2em" killerId={killer.id}/>{killer.powerTitle}
      <Field className={css.field} component={AddOnInput} filter={this.props.killer} name="addOn1" title="Add-On 1"/>
      <Field className={css.field} component={AddOnInput} filter={this.props.killer} name="addOn2" title="Add-On 2"/>
    </div>
  }

  handleKillerChange() {
    this.props.change("addOn1", "")
    this.props.change("addOn2", "")
  }

  render() {
    return <div className={classnames(css.container, this.props.className)}>
      <Field className={css.field} component={KillerInput} name="killer" title="Killer" onChange={this.handleKillerChange.bind(this)}/>
      {this.getAddOnFields()}
      <Field className={css.field} component={PerkInput} name="perk1" title="Perk 1" onlyKillerPerks/>
      <Field className={css.field} component={PerkInput} name="perk2" title="Perk 2" onlyKillerPerks/>
      <Field className={css.field} component={PerkInput} name="perk3" title="Perk 3" onlyKillerPerks/>
      <Field className={css.field} component={PerkInput} name="perk4" title="Perk 4" onlyKillerPerks/>
    </div>
  }

}