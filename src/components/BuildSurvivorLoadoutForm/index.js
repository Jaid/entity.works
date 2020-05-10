import classnames from "classnames"
import {isEmpty} from "has-content"
import PropTypes from "prop-types"
import React from "react"
import {connect} from "react-redux"
import {Field} from "redux-form"

import AddOn from "lib/AddOn"
import Item from "lib/Item"
import AddOnInput from "src/components/AddOnInput"
import ItemInput from "src/components/ItemInput"
import OfferingInput from "src/components/OfferingInput"
import PerkInput from "src/components/PerkInput"
import SurvivorInput from "src/components/SurvivorInput"
import TextInput from "src/components/TextInput"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  * }} Props
  */

@connect(({form}) => ({
  item: form.build?.values?.item,
}))

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class BuildSurvivorLoadoutForm extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    item: PropTypes.string,
    change: PropTypes.func.isRequired,
  }

  getAddOnFields() {
    const item = Item.find(this.props.item)
    if (!item) {
      return null
    }
    const addOns = AddOn.findByOwner(item.itemType)
    if (isEmpty(addOns)) {
      return null
    }
    return <div className={css.addOnFields}>
      <Field className={css.field} component={AddOnInput} filter={item.itemType} name="addOn1" title="Add-On 1"/>
      <Field className={css.field} component={AddOnInput} filter={item.itemType} name="addOn2" title="Add-On 2"/>
    </div>
  }

  handleItemChange() {
    this.props.change("addOn1", "")
    this.props.change("addOn2", "")
  }

  render() {
    return <div className={classnames(css.container, this.props.className)}>
      <div className={css.smallFields}>
        <div>
          <Field className={css.field} component={PerkInput} name="perk1" title="Perk 1" onlySurvivorPerks/>
          <Field className={css.field} component={PerkInput} name="perk2" title="Perk 2" onlySurvivorPerks/>
          <Field className={css.field} component={PerkInput} name="perk3" title="Perk 3" onlySurvivorPerks/>
          <Field className={css.field} component={PerkInput} name="perk4" title="Perk 4" onlySurvivorPerks/>
        </div>
        <div>
          <Field className={css.field} component={SurvivorInput} name="survivor" title="Survivor"/>
          <Field className={css.field} component={OfferingInput} name="offering" title="Offering" onlySurvivorOfferings/>
          <Field className={css.field} component={ItemInput} name="item" title="Item" onChange={this.handleItemChange.bind(this)}/>
          {this.getAddOnFields()}
        </div>
      </div>
      <Field component={TextInput} name="description" title="Description (optional)" multiline/>
    </div>
  }

}