import React from "react"
import PropTypes from "prop-types"
import {Tooltip as TippyTooltip} from "react-tippy"
import "./style.scss"

export default class Tooltip extends React.Component {

    static propTypes = {
      children: PropTypes.node.isRequired,
    }

    render() {
      return <TippyTooltip animateFill={false} animation="perspective" distance={15} theme="entity" arrow inertia interactive {...this.props}/>
    }

}