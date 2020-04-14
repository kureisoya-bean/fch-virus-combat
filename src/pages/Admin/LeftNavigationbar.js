import React, { Component } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import {
  GlobalOutlined,
  FundProjectionScreenOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu, Avatar, Divider } from "antd";
import { ButtonText } from "./../../component/Layout";
import styled from "styled-components";

//firebase
import { auth } from "../../firebase/firebase.js";

//Assets
import UserIcon from "./../../assets/logo/userIcon.png";
import logo from "./../../assets/logo/logo.png";

class LeftNavigation extends Component {
  state = {
    selectedMenu: 0,
    selectedPath: "",
    authAccess: true,
  };

  componentDidMount() {
    this.recheckSelectedMenu(this.props.pathName);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.pathName !== this.state.selectedPath)
      this.recheckSelectedMenu(newProps.pathName);
  }

  recheckSelectedMenu(pathName) {
    if (
      pathName === "/admin/donate" ||
      pathName.includes("/admin/editDonation/")
    )
      this.setState({
        selectedMenu: "0",
      });
    else if (pathName === "/admin/designs")
      this.setState({
        selectedMenu: "1",
      });
    else if (pathName === "/admin/designs")
      this.setState({
        selectedMenu: "2",
      });
    else if (pathName === "/admin/profile")
      this.setState({
        selectedMenu: 3,
      });
    this.setState({
      selectedPath: pathName,
    });
  }

  handleNavigation = (to) => {
    switch (to) {
      case "Donation":
        this.props.history.push("/admin/donate");
        break;

      case "3DDesigns":
        this.props.history.push("/admin/designs");
        break;

      case "Profile":
        this.props.history.push("/admin/profile");
        break;

      case "Request":
        this.props.history.push("/request");
        break;

      default:
        break;
    }
  };

  handleSubmitSignOut = () => {
    auth.signOut().then(() => {
      this.setState({
        authAccess: false,
      });
    });
  };

  render() {
    if (this.state.authAccess === false) return <Redirect to="/" />;
    return (
      <LeftContainer>
        <LeftMenu selectedKeys={[this.state.selectedMenu]} mode="inline">
          <Link to="/">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Logo src={logo} alt="logo" />
              <ButtonText
                style={{ marginTop: 25, marginLeft: 10, color: "#6979F8" }}
              >
                Co-Make
              </ButtonText>
            </div>
          </Link>
          <Divider />

          <div style={{ height: 30 }}></div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <ProfileAvatar alt="Profile" src={UserIcon} />
          </div>

          <div style={{ height: 10 }} />
          <Menu.Item
            key="0"
            onClick={this.handleNavigation.bind(this, "Donation")}
          >
            <GlobalOutlined />
            <span>Donation</span>
          </Menu.Item>

          <Menu.Item
            key="1"
            onClick={this.handleNavigation.bind(this, "Request")}
          >
            <GlobalOutlined />
            <span>Request List</span>
          </Menu.Item>

          <Menu.Item
            key="2"
            onClick={this.handleNavigation.bind(this, "3DDesigns")}
          >
            <FundProjectionScreenOutlined />
            <span>3D Designs</span>
          </Menu.Item>

          <Menu.Item
            key="3"
            onClick={this.handleNavigation.bind(this, "Profile")}
          >
            <UserOutlined />
            <span>Profile</span>
          </Menu.Item>

          <Menu.Item key="4" onClick={this.handleSubmitSignOut.bind(this)}>
            <LogoutOutlined />
            <span>Log Out</span>
          </Menu.Item>
        </LeftMenu>
      </LeftContainer>
    );
  }
}

export default withRouter(LeftNavigation);

const LeftMenu = styled(Menu)``;

const LeftContainer = styled.div`
  width: 240px;
  height: calc(100vh - 60px);
`;

const Logo = styled.img`
  margin-top: 10px;
  margin-bottom: -10px;
`;

const ProfileAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin: 20px;
`;
