import React from "react"
import DocumentTitle from "react-document-title"
import {Route, BrowserRouter, NavLink} from "react-router-dom"
import Header from "components/Header"
import ReactRouterScrollTop from "react-router-scroll-top"
import {ensureArray} from "magina"
import Switch from "react-router-transition-switch"
import Fader from "react-fader"

import withTracker from "./withTracker"

import "fork-awesome/css/fork-awesome.min.css"

import routes from "./routes.yml"
import css from "./style.scss"

export default class App extends React.Component {

  render() {
    const routeBlocks = []
    Object.entries(routes).forEach(([id, paths], index) => {
      ensureArray(paths).forEach((path, pathIndex) => {
        routeBlocks.push(<Route key={`${index}-${pathIndex}`} component={require(`../../pages/${id}`).default} path={path} exact/>)
      })
    })
    return <DocumentTitle title={_PKG_TITLE}>
      <div className={css.container}>
        <BrowserRouter>
          <ReactRouterScrollTop>
            <Header/>
            <Switch component={withTracker}>
              {routeBlocks}
            </Switch>
          </ReactRouterScrollTop>
        </BrowserRouter>
      </div>
    </DocumentTitle>
  }

}