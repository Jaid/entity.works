import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import RichBox from "components/RichBox"
import findObject, {findExactObject} from "lib/findObject"
import reactStringReplace from "react-string-replace"
import TiersBox from "components/TiersBox"
import splitOnFirst from "split-on-first"

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
      } else {
        const info = findExactObject(type, content)
        if (info) {
          richObject = {
            info,
            type,
          }
        }
      }
      if (richObject) {
        return <RichBox key={`RichBox${index}`} info={richObject.info} type={richObject.type}/>
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