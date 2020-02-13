import PropTypes from "prop-types"
import React from "react"

import Build from "components/Build"

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
export default class BuildFromDatabase extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    entry: PropTypes.object.isRequired,
  }

  render() {
    return <Build className={this.props.className} data={this.props.entry.data} linkId={this.props.entry.linkId} seoLinkId={this.props.entry.seoLinkId} type={this.props.entry.type} userName={this.props.entry["User.name"]} userTitle={this.props.entry["User.title"]}/>
  }

}