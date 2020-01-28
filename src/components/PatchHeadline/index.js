import classnames from "classnames"
import moment from "moment"
import PropTypes from "prop-types"
import React from "react"

import Headline from "components/Headline"

import css from "./style.scss"

/**
  * @typedef {{
  *  className: *,
  *  patchInfo: Object,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class PatchHeadline extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    patchInfo: PropTypes.object.isRequired,
  }

  render() {
    const agoString = `Released ${moment(this.props.patchInfo.date).fromNow()}`
    return <Headline miniText={agoString}>{this.props.patchInfo.semver}</Headline>
  }

}