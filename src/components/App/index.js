import React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import classnames from "classnames"
import PatchList from "components/PatchList"

import css from "./style.scss"

export default class App extends React.Component {

  render() {
    return <div className={css.container}><PatchList/></div>
  }

}