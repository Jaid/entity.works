import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import {getFormType} from "lib/formTypes"
import BuildKillerLoadoutContent from "components/BuildKillerLoadoutContent"
import Headline from "components/Headline"
import UserLink from "components/UserLink"

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
export default class Build extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    type: PropTypes.string.isRequired,
    data: PropTypes.object,
    userName: PropTypes.string,
    userTitle: PropTypes.string,
  }

  getContentComponent(formType) {
    if (formType.id === "killerLoadout") {
      return BuildKillerLoadoutContent
    }
  }

  getAuthorLine() {
    if (!this.props.userName) {
      return null
    }
    return <div className={css.authorLine}>
      by <UserLink name={this.props.userName} title={this.props.userTitle}/>
    </div>
  }

  render() {
    const formType = getFormType(this.props.type)
    const ContentComponent = this.getContentComponent(formType)
    return <div className={classnames(css.container, this.props.className)}>
      <Headline miniText={formType.title} theme="misc">{this.props.data?.title || "untitled"}</Headline>
      {this.getAuthorLine()}
      <ContentComponent data={this.props.data}/>
    </div>
  }

}