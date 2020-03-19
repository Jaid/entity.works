import "fork-awesome/css/fork-awesome.min.css"
import "react-toastify/dist/ReactToastify.min.css"
import "./analytics"

import {ensureArray} from "magina"
import React from "react"
import Fader from "react-fader"
import {Helmet} from "react-helmet"
import {Route, Router} from "react-router-dom"
import ReactRouterScrollTop from "react-router-scroll-top"
import Switch from "react-router-transition-switch"
import {ToastContainer} from "react-toastify"

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
    return <div id={css.containerWithId}>
      <Helmet>
        <title>{_PKG_TITLE}</title>
      </Helmet>
      <ToastContainer toastClassName={css.toast} newestOnTop/>
      <Router history={history}>
        <ReactRouterScrollTop>
          <Header/>
          <Switch component={Fader}>
            {routeBlocks}
          </Switch>
        </ReactRouterScrollTop>
      </Router>
    </div>
  }

}