import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import {getFormType} from "lib/formTypes"
import ContentLinkList from "src/components/ContentLinkList"
import SmallerTitle from "src/components/SmallerTitle"

import reduxSockConnect from "src/packages/redux-sock-connect"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  * }} Props
  */

@reduxSockConnect({
  event: "getBuildTypes",
})

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    fetchedData: PropTypes.array,
    withTitle: PropTypes.bool,
  }

  getTitle() {
    if (!this.props.withTitle) {
      return null
    }
    return <SmallerTitle>User Content</SmallerTitle>
  }

  render() {
    if (!this.props.fetchedData) {
      return null
    }
    const links = this.props.fetchedData.map(entry => {
      const formType = getFormType(entry.type)
      return {
        to: `user-builds/${formType.linkId}`,
        count: entry.count,
        text: `${formType.title}s`,
      }
    })
    return <div>
      {this.getTitle()}
      <ContentLinkList links={links}/>
    </div>
  }

}