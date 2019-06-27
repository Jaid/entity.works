import React from "react"
import DocumentTitle from "react-document-title"
import {Route, BrowserRouter, NavLink} from "react-router-dom"
import Header from "components/Header"
import ReactRouterScrollTop from "react-router-scroll-top"
import {ensureArray} from "magina"

import routes from "./routes.yml"
import css from "./style.scss"

export default class App extends React.Component {

  render() {
    const routeBlocks = []
    Object.entries(routes).forEach(([id, paths], index) => {
      for (const path of paths |> ensureArray) {
        routeBlocks.push(<Route key={index} component={require(`../../pages/${id}`).default} path={path} exact/>)
      }
    })
    return <DocumentTitle title={_PKG_TITLE}>
      <div className={css.container}>
        <BrowserRouter>
          <ReactRouterScrollTop>
            <Header/>
            {routeBlocks}
          </ReactRouterScrollTop>
        </BrowserRouter>
      </div>
    </DocumentTitle>
  }

}