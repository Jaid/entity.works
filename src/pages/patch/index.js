import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import patches from "lib/patches"
import PatchBlock from "components/PatchBlock"

import css from "./style.scss"

/**
  * @typedef {{
  *  className: *
  *  match: {
  *    isExact: boolean
  *    path: string
  *    url: string
  *    params: {version: string}
  *  }
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
class PatchPage extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    match: PropTypes.exact({
      isExact: PropTypes.bool.isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      params: PropTypes.object,
    }).isRequired,
  }

  render() {
    const patch = patches.find(({linkId}) => linkId === this.props.match.params.version)
    return <main className={classnames(css.container, this.props.className)}>
      <PatchBlock patch={patch}/>
    </main>
  }

}

export default PatchPage