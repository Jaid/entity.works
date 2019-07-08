import React from "react"
import DocumentTitle from "react-document-title"
import {Route, Router} from "react-router-dom"
import Header from "components/Header"
import ReactRouterScrollTop from "react-router-scroll-top"
import {ensureArray} from "magina"
import Switch from "react-router-transition-switch"
import Fader from "react-fader"
import {createBrowserHistory} from "history"
import ReactGoogleAnalytics from "react-ga"

import "fork-awesome/css/fork-awesome.min.css"

import routes from "./routes.yml"
import css from "./style.scss"

const history = createBrowserHistory()

if (GOOGLE_ANALYTICS_TRACKING_ID) {
  ReactGoogleAnalytics.initialize(GOOGLE_ANALYTICS_TRACKING_ID)
  ReactGoogleAnalytics.pageview(window.location.pathname + window.location.search)
  history.listen(location => {
    ReactGoogleAnalytics.set({page: location.pathname})
    ReactGoogleAnalytics.pageview(location.pathname)
  })
}

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