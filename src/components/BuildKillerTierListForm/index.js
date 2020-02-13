import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import {Field} from "redux-form"

import Killer from "lib/Killer"
import KillerBox from "components/KillerBox"
import TextInput from "components/TextInput"
import TierInput from "components/TierInput"

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
export default class BuildKillerTierListForm extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
  }

  render() {
    const elements = Killer.allVisible.map(killer => {
      return <div key={killer.id} className={css.block}>
        <div className={css.killerBox}>
          <KillerBox killer={killer.id}/>
        </div>
        <Field component={TierInput} name={`tiers.${killer.id}.tier`}/>
        <Field className={css.comment} component={TextInput} name={`tiers.${killer.id}.comment`} title="Comment (optional)" multiline/>
      </div>
    })
    return <div className={classnames(css.container, this.props.className)}>
      <Field component={TextInput} name="description" title="Description (optional)" multiline/>
      {elements}
    </div>
  }

}