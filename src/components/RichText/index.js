import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import RichBox from "components/RichBox"
import findObject, {findExactObject} from "lib/findObject"
import reactStringReplace from "react-string-replace"
import TiersBox from "components/TiersBox"

import css from "./style.scss"

const getRichText = text => {
  return reactStringReplace(text, /{(.+?)}/g, (token, index) => {
    const typeMatch = /^(?<type>[a-z]+):(?<name>.+)/.exec(token)
    let richObject
    if (typeMatch === null) {
      richObject = findObject(token)
    } else if (typeMatch.groups.type === "tiers") {
      return <TiersBox tiers={typeMatch.groups.name.split("/")}/>
    } else {
      const info = findExactObject(typeMatch.groups.name)
      if (info) {
        richObject = {
          info,
          type: typeMatch.groups.type,
        }
      }
    }
    if (richObject) {
      return <RichBox key={index} info={richObject.info} type={richObject.type}/>
    }
  })
}

export default class RichText extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.string.isRequired,
  }

  render() {
    return <span className={classnames(css.container, this.props.className)}>
      {getRichText(this.props.children)}
    </span>
  }

}