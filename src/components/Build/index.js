import classnames from "classnames"
import moment from "moment"
import {paramCase} from "param-case"
import PropTypes from "prop-types"
import React from "react"
import {Link} from "react-router-dom"

import findPatchForDate from "lib/findPatchForDate"
import {getFormType} from "lib/formTypes"
import Patch from "lib/Patch"
import BuildKillerLoadoutContent from "components/BuildKillerLoadoutContent"
import BuildKillerTierListContent from "components/BuildKillerTierListContent"
import BuildSurvivorLoadoutContent from "components/BuildSurvivorLoadoutContent"
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
    linkId: PropTypes.string,
    seoLinkId: PropTypes.string,
    createdAt: PropTypes.string,
  }

  getContentComponent(formType) {
    if (formType.id === "killerLoadout") {
      return BuildKillerLoadoutContent
    }
    if (formType.id === "survivorLoadout") {
      return BuildSurvivorLoadoutContent
    }
    if (formType.id === "killerTierList") {
      return BuildKillerTierListContent
    }
  }

  getLink(title) {
    if (!this.props.linkId) {
      return <span>{title}</span>
    }
    const link = `/user-build/${this.props.linkId}/${this.props.seoLinkId || paramCase(title)}`
    return <Link to={link}>{title}</Link>
  }

  getAuthor() {
    if (!this.props.userName) {
      return null
    }
    return <span>by <UserLink name={this.props.userName} title={this.props.userTitle}/></span>
  }

  getTitleLine(formType, title) {
    return <div className={css.titleLine}>
      {this.getLink(title)}
      {this.getAuthor()}
    </div>
  }

  getDate() {
    if (!this.props.createdAt) {
      return null
    }
    const date = new Date(this.props.createdAt)
    const createdAtMoment = moment(date)
    const agoString = createdAtMoment.fromNow()
    const patch = findPatchForDate(date)
    if (!patch || Patch.all.indexOf(patch) === 0) {
      return <div className={css.createdAt}>Created {agoString}.</div>
    }
    return <div className={css.createdAt}><div>Created {agoString}.</div><div>For an older ingame version: <Link to={`/patch/${patch.linkId}`}>{patch.semver}</Link></div></div>
  }

  render() {
    const formType = getFormType(this.props.type)
    const title = this.props.data?.title || formType.title
    const ContentComponent = this.getContentComponent(formType)
    return <div className={classnames(css.container, this.props.className)}>
      <Headline miniText={formType.title} theme="misc">{title}</Headline>
      <div className={css.content}>
        {this.getTitleLine(formType, title)}
        <ContentComponent data={this.props.data}/>
        {this.getDate()}
      </div>
    </div>
  }

}