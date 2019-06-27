import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import Headline from "components/Headline"
import moment from "moment"

import css from "./style.scss"

const getHeaderText = patch => {
  const agoString = moment(patch.dateMs).fromNow()
  if (patch.title) {
    return {
      title: patch.title,
      info: `${patch.semver} - ${agoString}`,
    }
  } else {
    return {
      title: `PATCH ${patch.semver}`,
      info: agoString,
    }
  }
}

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
    const headerText = getHeaderText(this.props.patchInfo)
    return <Headline miniText={headerText.info}>{headerText.title}</Headline>
  }

}