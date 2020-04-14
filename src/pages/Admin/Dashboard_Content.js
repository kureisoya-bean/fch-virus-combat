import React, { Component } from "react";
import Donate from "./Donate";
import Designs from "./Dashboard_3dDesigns";
import Profile from "./Profile";
import EditDonation from "./Dashboard_Edit";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

//firebase
import { auth } from "../../firebase/firebase.js";

//ant design
import { message } from "antd";

class DashboardContent extends Component {
  state = {
    authAcess: "Load",
    authId: "",
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authAccess: "Accept",
          authId: user.uid,
        });
      } else {
        this.setState(
          {
            authAccess: "Decline",
          },
          () => {
            message.error("Please login or register as an Admin");
          }
        );
      }
    });
  }

  render() {
    if (this.state.authAccess === "Accept") {
      return (
        <DashboardContainer>
          {this.props.pathName === "/admin/donate" ? (
            <Donate auth={this.state.authId} />
          ) : null}
          {this.props.pathName === "/admin/designs" ? <Designs /> : null}

          {this.props.pathName.includes("/admin/editDonation/") ? (
            <EditDonation />
          ) : null}
          {this.props.pathName === "/admin/profile" ? <Profile /> : null}
        </DashboardContainer>
      );
    } else if (this.state.authAccess === "Decline") {
      return <Redirect to="/" />;
    } else {
      return message.loading("Action in progress..", 0.1);
    }
  }
}

export default DashboardContent;

const DashboardContainer = styled.div`
  position: absolute;
  width: calc(100vw - 240px);
  max-width: calc(100vw - 240px);
  min-height: 100vh;
  background: #fafafa;
  top: 0;
  left: 240px;
`;
