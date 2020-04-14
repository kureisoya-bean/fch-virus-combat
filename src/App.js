import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//Components
import ExplorePage from "./pages/ExplorePage";
import SearchPage from "./pages/SearchPage";
import FrontlinersPage from "./pages/FrontlinersPage";
import MakerPage from "./pages/MakerPage";
import ThreeDesignPage from "./pages/3DDesignPage";
// import DoneePage from "./pages/DoneePage.js";
// import DonatePage from "./pages/DonatePage.js";
// import ModelPage from "./pages/ModelPage.js";
// import TViewer from "./pages/TViewer.js";
// import ViewerPage from "./pages/ViewerPage.js";
// import Admin from "./pages/Admin/Dashboard";

import "./App.css";
import "antd/dist/antd.css";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ExplorePage} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/maker" component={MakerPage} />
          <Route exact path="/frontliner" component={FrontlinersPage} />
          <Route exact path="/design" component={ThreeDesignPage} />
          {/* <Route exact path="/donee" component={DoneePage} /> */}
          {/* <Route exact path="/donate" component={DonatePage} />
          <Route exact path="/model" component={ModelPage} />
          <Route exact path="/viewer" component={TViewer} />
          <Route exact path="/view" component={ViewerPage} /> */}
          {/* <Route exact path="/admin/donate" component={Admin} />
          <Route path="/admin/editDonation/:id" component={Admin} />
          <Route exact path="/admin/designs" component={Admin} />
          <Route exact path="/admin/profile" component={Admin} />  */}
        </Switch>
      </BrowserRouter>
    );
  }
}
