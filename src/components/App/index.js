import React from "react"
import "react-tippy/dist/tippy.css"
import DocumentTitle from "react-document-title"
import {Route, BrowserRouter, Link} from "react-router-dom"
import IndexPage from "src/pages/index"
import PatchPage from "src/pages/patch"
import PatchesPage from "src/pages/patches"
import Header from "components/Header"

import css from "./style.scss"

export default class App extends React.Component {

  render() {
    return <DocumentTitle title={_PKG_TITLE}>
      <div className={css.container}>
        <BrowserRouter>
          <Header/>
          <Route component={IndexPage} path="/" exact/>
          <Route component={PatchesPage} path="/patches" exact/>
          <Route component={PatchPage} path="/patch/:version" exact/>
        </BrowserRouter>
      </div>
    </DocumentTitle>
  }

}