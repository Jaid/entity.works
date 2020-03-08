import PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet"

import AddOn from "lib/AddOn"
import {flattenRichText} from "lib/normalizeRichText"
import AddOnBlock from "components/AddOnBlock"
import CharacterBlock from "components/CharacterBlock"
import SmallerTitle from "components/SmallerTitle"
import Title from "components/Title"

import css from "./style.scss"

/**
  * @typedef {{
  *   match: {
  *    isExact: boolean
  *    path: string
  *    url: string
  *    params: object.<string, string>
  *  },
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class AddOnPage extends React.Component {

  static propTypes = {
    match: PropTypes.exact({
      isExact: PropTypes.bool.isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      params: PropTypes.object,
    }).isRequired,
  }

  getOwnerContent(addOn) {
    if (addOn.isForPower()) {
      return <div>
        <SmallerTitle>Available for {addOn.getForTitle()}</SmallerTitle>
        <CharacterBlock characterId={addOn.for}/>
      </div>
    }
    return null
  }

  getFullDescription(addOn) {
    return `Dead by Daylight add-on ${addOn.title}. ${flattenRichText(addOn.richEffect, addOn.title)}`
  }

  render() {
    const addOn = AddOn.find(this.props.match.params.id)
    if (!addOn) {
      return `No add-on found for "${this.props.match.params.id}".`
    }
    return <main className={css.container}>
      <Helmet>
        <title>{addOn.title} | Dead by Daylight {addOn.getOverTitle()}</title>
        <meta content={this.getFullDescription(addOn)} name="description"/>
      </Helmet>
      <Title>{addOn.title} Add-On</Title>
      <AddOnBlock addOnId={addOn.id}/>
      {this.getOwnerContent(addOn)}
    </main>
  }

}