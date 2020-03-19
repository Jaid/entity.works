import classnames from "classnames"
import {isEmpty} from "has-content"
import PropTypes from "prop-types"
import React from "react"

import collator from "lib/collator"
import Offering from "lib/Offering"
import OfferingImage from "components/OfferingImage"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   title: string,
  *   name: string,
  *   onlyKillerOfferings: boolean,
  *   onlySurvivorOfferings: boolean
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class OfferingInput extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    title: PropTypes.string,
    onlyKillerOfferings: PropTypes.bool,
    onlySurvivorOfferings: PropTypes.bool,
    input: PropTypes.any.isRequired,
  }

  getOfferingList() {
    if (this.props.onlyKillerOfferings) {
      return Offering.forKiller
    }
    if (this.props.onlySurvivorOfferings) {
      return Offering.forSurvivor
    }
    return Offering.allVisible
  }

  getImage() {
    if (isEmpty(this.props.input.value)) {
      return <span className={css.iconPlaceholder}/>
    }
    return <OfferingImage height="2.5em" offeringId={this.props.input.value}/>
  }

  render() {
    const offeringList = [...this.getOfferingList()]
    offeringList.sort((offering1, offering2) => {
      return collator.compare(offering1.title, offering2.title)
    })
    const options = offeringList.map(offering => {
      return <option key={offering.id} value={offering.id}>{offering.title}</option>
    })
    return <div className={classnames(css.container, this.props.className)}>
      <div>
        <div>
          {this.props.title}
        </div>
        <select value={this.props.input.value} onChange={this.props.input.onChange.bind(this)}>
          <option value="">(none)</option>
          {options}
        </select>
      </div>
      {this.getImage()}
    </div>
  }

}