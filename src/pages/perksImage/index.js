import canvasToImage from "canvas-to-image"
import html2canvas from "html2canvas"
import {uniq} from "lodash"
import PropTypes from "prop-types"
import React from "react"
import {Link} from "react-router-dom"

import findObject from "lib/findObject"
import Perk from "lib/Perk"

import PerkImage from "src/components/PerkImage"

import css from "./style.scss"

/**
  * @typedef {Object} Props
  * @prop {Object} match
  * @prop {boolean} match.isExact
  * @prop {string} match.path
  * @prop {string} match.url
  * @prop {Object} match.params
  * @prop {string} match.params.build
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class PerksImagePage extends React.Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
  }

  getPerk(perk) {
    return <span key={perk.id} className={css.perk}>
      <PerkImage className={css.perkImage} perkId={perk.id}/>
    </span>
  }

  async download(fileName) {
    const image = await html2canvas(this.canvasRef.current, {
      backgroundColor: null,
    })
    canvasToImage(image, {
      name: fileName,
      type: "png",
      quality: 1,
    })
  }

  render() {
    if (!this.props.match.params.build) {
      return <div>
        <div>
          No build given.
        </div>
        <Link to="/perksImage/unbreakable,selfCare,adrenaline,wellMakeIt">Example</Link>
      </div>
    }
    const objectIds = uniq(this.props.match.params.build.split(","))
    const objects = objectIds.map(findObject)
    const perks = objects.filter(object => object.type === "perk")
    const sortedPerks = Perk.sortByTitle(perks)
    const perkNames = sortedPerks.map(perk => perk.id).join(", ")
    return <div>
      <div className={css.downloadButton}>
        <button type="button" onClick={() => this.download(perkNames)}>Download Png</button>
      </div>
      <main ref={this.canvasRef} className={css.container}>
        <div className={css.showcase} id="showcase">
          <div className={css.perks}>
            {sortedPerks.map(this.getPerk)}
          </div>
        </div>
      </main>
    </div>
  }

}