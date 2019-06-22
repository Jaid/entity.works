import React from "react"
import "react-tippy/dist/tippy.css"
import DocumentTitle from "react-document-title"
import {Route, BrowserRouter, Link} from "react-router-dom"
import IndexPage from "src/pages/index"
import PatchPage from "src/pages/patch"
import patches from "lib/patches"

import css from "./style.scss"

export default class App extends React.Component {

  render() {
    const links = patches.map(patch => <div key={patch.semver}><Link to={`/patch/${patch.linkId}`}>{patch.semver}</Link></div>)
    return <DocumentTitle title={_PKG_TITLE}>
      <div className={css.container}>
        <BrowserRouter>
          {links}
          <Route component={IndexPage} path="/" exact/>
          <Route component={PatchPage} path="/patch/:version" exact/>
        </BrowserRouter>
      </div>
    </DocumentTitle>
  }

}