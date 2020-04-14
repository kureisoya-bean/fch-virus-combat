import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CoMakeTitle, Header, ButtonText } from "./Layout.js";
//Ant Design
import { Menu } from "antd";
import LogoLarge from "../assets/Logo/logoLarge.png";

class CustomHeader extends Component {
  handleMenuClick = () => {};

  handleSubmitSignOut = () => {};
  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item>
          <Link to="/admin/donate">
            <ButtonText>Admin Page</ButtonText>
          </Link>
        </Menu.Item>
        <Menu.Item onClick={this.handleSubmitSignOut.bind(this)}>
          <ButtonText>Sign Out</ButtonText>
        </Menu.Item>
      </Menu>
    );

    return (
      <Header>
        <LogoContainer to="/">
          <img src={LogoLarge} style={{ height: 40, width: 40 }} alt="logo" />
          <CoMakeTitle level={4}>Co-Make</CoMakeTitle>
        </LogoContainer>
        <div style={{ flexGrow: 1 }} />
        <Link to="/maker">
          <NavText>For Makers</NavText>
        </Link>
        <Link to="/frontliner">
          <NavText>For Frontliners</NavText>
        </Link>
      </Header>
    );
  }
}

export default CustomHeader;

const LogoContainer = styled(Link)`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 60px;
`;

const NavText = styled(ButtonText)`
  color: #6979f8;
  margin-right: 40px;
  :hover {
    color: #8999f8;
  }
`;
