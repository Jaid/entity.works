import classnames from "classnames"
import {isEmpty} from "has-content"
import PropTypes from "prop-types"
import React from "react"

import BuildFromDatabase from "src/components/BuildFromDatabase"
import Title from "src/components/Title"

import reduxSockConnect from "src/packages/redux-sock-connect"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  * }} Props
  */

@reduxSockConnect(props => {
  return {
    event: "getBuilds",
    payload: {
      filterType: props.filterType,
      value: props.value,
      limit: props.limit,
    },
  }
})

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class FilteredBuilds extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    title: PropTypes.string,
    filterType: PropTypes.string.isRequired,
    value: PropTypes.string,
    limit: PropTypes.number,
    fetchedData: PropTypes.object,
  }

  static defaultProps = {
    limit: 3,
    title: "User builds",
  }

  getTitle() {
    if (this.props.title) {
      return <Title>{this.props.title}</Title>
    }
    return null
  }

  getContent() {
    const entries = this.props.fetchedData.rows.map(entry => {
      return <BuildFromDatabase key={entry.id} className={css.build} entry={entry}/>
    })
    return <div>
      {entries}
    </div>
  }

  render() {
    if (isEmpty(this.props.fetchedData) || !this.props.fetchedData.count) {
      return null
    }
    return <div className={classnames(css.container, this.props.className)}>
      {this.getTitle()}
      {this.getContent()}
    </div>
  }

}