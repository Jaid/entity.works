import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import Autosuggest from "react-autosuggest"
import {withRouter} from "react-router"

import AddOn from "lib/AddOn"
import Item from "lib/Item"
import Killer from "lib/Killer"
import Offering from "lib/Offering"
import Perk from "lib/Perk"
import Survivor from "lib/Survivor"
import AddOnImage from "components/AddOnImage"
import ItemImage from "components/ItemImage"
import KillerImage from "components/KillerImage"
import OfferingImage from "components/OfferingImage"
import PerkImage from "components/PerkImage"
import SurvivorImage from "components/SurvivorImage"

import css from "./style.scss"

const entries = []

for (const perk of Perk.allVisible) {
  entries.push({
    id: perk.id,
    title: perk.title,
    type: "perk",
    getImage: () => <PerkImage className={css.entryImage} height="2em" perkId={perk.id}/>,
    link: `/perk/${perk.linkId}`,
  })
}

for (const killer of Killer.allVisible) {
  entries.push({
    id: killer.id,
    title: killer.title,
    type: "killer",
    getImage: () => <KillerImage className={css.entryImage} killerId={killer.id}/>,
    link: `/killer/${killer.linkId}`,
  })
}

for (const survivor of Survivor.allVisible) {
  entries.push({
    id: survivor.id,
    title: survivor.title,
    type: "survivor",
    getImage: () => <SurvivorImage className={css.entryImage} survivorId={survivor.id}/>,
    link: `/survivor/${survivor.linkId}`,
  })
}

for (const offering of Offering.allVisible) {
  entries.push({
    id: offering.id,
    title: offering.title,
    type: "offering",
    getImage: () => <OfferingImage className={css.entryImage} height="2em" offeringId={offering.id}/>,
    link: `/offering/${offering.linkId}`,
  })
}

for (const addOn of AddOn.allVisible) {
  entries.push({
    id: addOn.id,
    title: addOn.title,
    type: "addOn",
    getImage: () => <AddOnImage addOnId={addOn.id} className={css.entryImage} height="2em"/>,
    link: `/add-on/${addOn.linkId}`,
  })
}

for (const item of Item.allVisible) {
  entries.push({
    id: item.id,
    title: item.title,
    type: "item",
    getImage: () => <ItemImage className={css.entryImage} height="2em" itemId={item.id}/>,
    link: `/item/${item.linkId}`,
  })
}

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase()
  let results
  if (inputValue.length === 1) {
    results = entries.filter(entry => {
      return entry.title.toLowerCase()[0] === inputValue || entry.id.toLowerCase()[0] === inputValue
    })
  } else {
    results = entries.filter(entry => {
      return entry.title.toLowerCase().includes(inputValue) || entry.id.toLowerCase().includes(inputValue)
    })
  }
  return results.slice(0, 8)
}

const getSuggestionValue = suggestion => suggestion.id

const renderSuggestion = suggestion => {
  return <div className={classnames(css.entry, css[`${suggestion.type}Entry`])}>{suggestion.getImage()}<span className={css.title}>{suggestion.title}</span></div>
}

/**
  * @typedef {{
  *  className: *,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
@withRouter
export default class SearchBar extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    history: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.state = {
      value: "",
      suggestions: [],
    }
  }

  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue,
    })
  };

  handleSuggestionsFetchRequested = ({value}) => {
    this.setState({
      suggestions: getSuggestions(value),
    })
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  };

  render() {
    const inputProps = {
      value: this.state.value,
      placeholder: "Quick Search",
      onChange: this.onChange,
    }

    return (
      <Autosuggest
        getSuggestionValue={getSuggestionValue}
        inputProps={inputProps}
        renderSuggestion={renderSuggestion}
        suggestions={this.state.suggestions}
        theme={css}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        onSuggestionSelected={(event, {suggestion}) => {
          if (suggestion.link) {
            this.props.history.push(suggestion.link)
          }
          this.setState({
            value: "",
          })
        }}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
      />
    )
  }

}