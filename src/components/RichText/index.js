import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import reactStringReplace from "react-string-replace"
import splitOnFirst from "split-on-first"

import findObject from "lib/findObject"
import FlavorText from "components/FlavorText"
import RichBox from "components/RichBox"
import TiersBox from "components/TiersBox"

import css from "./style.scss"

export default class RichText extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  }

  static defaultProps = {
  }

  render() {
    const processedRichText = reactStringReplace(this.props.children, /{(.+?)}/g, (token, index) => {
      const [type, content] = splitOnFirst(token, ":")
      let richObject
      if (content === undefined) {
        richObject = findObject(token)
      } else if (type === "tiers") {
        return <TiersBox key={`TiersBox${index}`} tiers={content.split("/")}/>
      } else if (type === "flavor") {
        return <FlavorText key={`FlavorText${index}`} content={content}/>
      } else {
        richObject = findObject(content)
      }
      if (richObject) {
        return <RichBox key={`Box${index}`} objectId={richObject.id}/>
      }
    })

    let i = 0
    const formattedText = reactStringReplace(processedRichText, "\n", () => {
      return <br key={i++}/>
    })

    return <span className={classnames(css.container, this.props.className)}>
      {formattedText}
    </span>
  }

}