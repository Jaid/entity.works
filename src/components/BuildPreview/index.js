import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import {connect} from "react-redux"

import Build from "components/Build"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  * }} Props
  */

@connect(({form}) => ({
  data: form.build?.values,
}))

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class BuildPreview extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
  }

  render() {
    return <Build {...this.props}/>
  }

}