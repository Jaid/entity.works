import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import Autosuggest from "react-autosuggest"
import Picture from "react-modern-picture"
import {withRouter} from "react-router"

import killers from "lib/killers"
import perks from "lib/perks"
import survivors from "lib/survivors"

import css from "./style.scss"

const entries = []

for (const perk of perks.filter(({visible}) => Boolean(visible))) {
  const imgSrc = require(`../../data/perks/${perk.id}/icon.png`).default
  const backgroundSrc = require(`../../data/perkBackgrounds/${perk.rarity}.png`).default
  entries.push({
    id: perk.id,
    title: perk.title,
    type: "perk",
    getImage: () => <Picture className={css.entryImage}
      input={imgSrc}
      style={{
        background: `url(${backgroundSrc})`,
        backgroundSize: "cover",
      }}/>,
    link: `/perk/${perk.linkId}`,
  })
}

for (const killer of killers) {
  const imgSrc = require(`../../data/killers/${killer.id}/icon.png`).default
  entries.push({
    id: killer.id,
    title: killer.title,
    type: "killer",
    getImage: () => <Picture className={css.entryImage} input={imgSrc}/>,
    link: `/killer/${killer.linkId}`,
  })
}

for (const survivor of survivors) {
  const imgSrc = require(`../../data/survivors/${survivor.id}/icon.png`).default
  entries.push({
    id: survivor.id,
    title: survivor.title,
    type: "survivor",
    getImage: () => <Picture className={css.entryImage} input={imgSrc}/>,
    link: `/survivor/${survivor.linkId}`,
  })
}

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase()
  return entries.filter(entry => entry.title.toLowerCase().includes(inputValue) || entry.id.toLowerCase().includes(inputValue)).slice(0, 8)
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