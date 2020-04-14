import React, { Component } from "react";

//Components
import LeftNav from "./LeftNavigationbar.js";
import DashboardContent from "./Dashboard_Content.js";

class Dashboard extends Component {
  state = {};

  render() {
    return (
      <div>
        <LeftNav pathName={this.props.location.pathname} />
        <DashboardContent pathName={this.props.location.pathname} />
      </div>
    );
  }
}

export default Dashboard;
