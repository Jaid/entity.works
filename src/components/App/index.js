import "fork-awesome/css/fork-awesome.min.css"
import "./analytics"

import {ensureArray} from "magina"
import React from "react"
import DocumentTitle from "react-document-title"
import Fader from "react-fader"
import ReactGoogleAnalytics from "react-ga"
import {Route, Router} from "react-router-dom"
import ReactRouterScrollTop from "react-router-scroll-top"
import Switch from "react-router-transition-switch"

import Header from "components/Header"

import history from "./history"
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
        <Router history={history}>
          <ReactRouterScrollTop>
            <Header/>
            <Switch component={Fader}>
              {routeBlocks}
            </Switch>
          </ReactRouterScrollTop>
        </Router>
      </div>
    </DocumentTitle>
  }

}