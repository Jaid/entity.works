import PropTypes from "prop-types"
import React from "react"

import Build from "src/components/Build"

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
    return <Build className={this.props.className} createdAt={this.props.entry.createdAt} data={this.props.entry.data} editable={this.props.entry.editable} linkId={this.props.entry.id} seoLinkId={this.props.entry.seoLinkId} type={this.props.entry.type} userName={this.props.entry["User.name"]} userTitle={this.props.entry["User.title"]}/>
  }

}