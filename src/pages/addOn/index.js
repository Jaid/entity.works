import PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet"

import AddOn from "lib/AddOn"
import AddOnBlock from "components/AddOnBlock"
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

  render() {
    const addOn = AddOn.find(this.props.match.params.id)
    return <main className={css.container}>
      <Helmet>
        <title>{addOn.title} | Dead by Daylight {addOn.getOverTitle()}</title>
      </Helmet>
      <Title>{addOn.title} Add-On</Title>
      <AddOnBlock addOnId={addOn.id}/>
    </main>
  }

}