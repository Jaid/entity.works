import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import RichBox from "components/RichBox"
import findObject, {findExactObject} from "lib/findObject"
import reactStringReplace from "react-string-replace"
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
      const typeMatch = /^(?<type>[a-z]+):(?<name>.+)/.exec(token)
      let richObject
      if (typeMatch === null) {
        richObject = findObject(token)
      } else if (typeMatch.groups.type === "tiers") {
        return <TiersBox key={`TiersBox${index}`} tiers={typeMatch.groups.name.split("/")}/>
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