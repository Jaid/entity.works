import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import {getFormType} from "lib/formTypes"
import BuildKillerLoadoutContent from "components/BuildKillerLoadoutContent"
import Headline from "components/Headline"

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
  }

  getContentComponent(formType) {
    if (formType.id === "killerLoadout") {
      return BuildKillerLoadoutContent
    }
  }

  render() {
    const formType = getFormType(this.props.type)
    const ContentComponent = this.getContentComponent(formType)
    return <div className={classnames(css.container, this.props.className)}>
      <Headline miniText={formType.title} theme="misc">{this.props.data?.title || "untitled"}</Headline>
      <ContentComponent data={this.props.data}/>
    </div>
  }

}