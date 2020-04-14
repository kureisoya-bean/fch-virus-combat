import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

//Assets
import backgroundModal from "../assets/BgModal.png";
import tdesign from "../assets/3dDesign.png";
import LogoLarge from "../assets/logo/logoLarge.png";
//Commponents
import LoginModal from "./../component/LoginModal";

//Layout
import {
  Header,
  CoMakeLogo,
  ButtonText,
  Heading2,
  Caption,
  SelectBar,
  CoMakeButton,
  CoMakeCard,
  Banner,
  NavText,
  CoMakeTitle,
} from "../component/Layout.js";

//Ant Design
import {
  Card,
  Input,
  Select,
  Row,
  Col,
  Dropdown,
  Menu,
  Pagination,
} from "antd";

import { UserOutlined } from "@ant-design/icons";
//firebase
import { auth } from "../firebase/firebase.js";

const { Option } = Select;
const { Meta } = Card;

export default class ModalPage extends Component {
  state = {
    modalList: [
      {
        name: "3D Surgucal Mask A",
        organization: "Penang General Hospital",
        uploadDate: 2,
      },
      {
        name: "3D Surgucal Mask",
        organization: "WHO(World Health Organization)",
        uploadDate: 4,
      },
      {
        name: "3D Face Shield",
        organization: "Penang General Hospital",
        uploadDate: 3,
      },
    ],
    visible: false,
    visibleMenu: false,
    authAccess: false,
  };

  handleVisibleChange = (flag) => {
    this.setState({ visibleMenu: flag });
  };

  handleSubmitSignOut = () => {
    auth.signOut().then(() => {
      this.setState({
        authAccess: false,
      });
    });
  };

  handleOpen = (bool) => {
    this.setState({
      visible: bool,
    });
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user)
        this.setState({
          authAccess: true,
          visibleMenu: false,
        });
    });
  }

  renderModalContent = () => {
    let modalList = [];
    this.state.modalList.map((eachModal) => {
      modalList.push(
        <Col span={7} offset={1}>
          <CoMakeCard
            cover={<img alt="Modal" src={tdesign} />}
            hoverable
            bodyStyle={{ paddingTop: "10px" }}
            style={{ marginBottom: "30px" }}
          >
            <Meta
              title={<ButtonText>{eachModal.name}</ButtonText>}
              description={
                <Caption style={{ color: "#666666", marginTop: "-6px" }}>
                  {eachModal.organization} .{eachModal.uploadDate}d ago
                </Caption>
              }
            />
          </CoMakeCard>
        </Col>
      );
    });
    return modalList;
  };

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
      <>
        <Header>
          <CoMakeLogo to="/">
            <img src={LogoLarge} style={{ height: 40, width: 40 }} alt="logo" />
            <CoMakeTitle level={4}>Co-Make</CoMakeTitle>
          </CoMakeLogo>
          <div style={{ flexGrow: 1 }} />
          <Link to="/donee">
            <NavText>Raise a Fund</NavText>
          </Link>
          <Link to="/model">
            <NavText>3D Design</NavText>
          </Link>
          {this.state.authAccess ? (
            <Dropdown
              overlay={menu}
              onVisibleChange={this.handleVisibleChange}
              visible={this.state.visibleMenu}
            >
              <NavText>
                <UserOutlined />
                &nbsp;Admin
              </NavText>
            </Dropdown>
          ) : (
            <NavText onClick={this.handleOpen.bind(this)}>Login</NavText>
          )}
        </Header>

        <TabContainer>
          <TabTitle>Explore and Download 3D models in here</TabTitle>
          <br />
          <InputSubtitle>ORGANIZATION</InputSubtitle>
          <TabInput placeholder="Name" />
          <InputSubtitle>TYPE</InputSubtitle>
          <SelectBar size="large">
            <Option value="money">Surgical Mask</Option>
            <Option value="mask">Face Shield</Option>
          </SelectBar>
          <ButtonContainer>
            <ButtonSearch type="primary">
              <ButtonText>Search</ButtonText>
            </ButtonSearch>
          </ButtonContainer>
        </TabContainer>

        <Banner style={{ backgroundImage: `url(${backgroundModal})` }} />
        <LoginModal visible={this.state.visible} handleOpen={this.handleOpen} />

        <ModalContainer>
          <ModalTitle>Explore 3D</ModalTitle>
          <Row>
            {this.renderModalContent()}
            {this.renderModalContent()}
          </Row>
        </ModalContainer>

        <PageContainer>
          <Pagination defaultCurrent={1} total={50} />
        </PageContainer>
      </>
    );
  }
}

const TabContainer = styled(Card)`
  width: 500px;
  height: auto;
  margin-left: 80px;
  margin-top: 80px;
  position: absolute;
  background-color: white;
  border-radius: 10px;
`;

const TabTitle = styled(Heading2)`
  text-align: left;
`;

const TabInput = styled(Input)`
  width: 98%;
  height: 44px;
  margin-bottom: 30px;
  border-radius: 10px;
`;

const InputSubtitle = styled(Caption)`
  font-weight: bold;
`;

const ButtonSearch = styled(CoMakeButton)`
  background-color: #6979f8;
  margin-top: 40%;

  :hover {
    background-color: #a5affb;
  }

  :focus {
    background-color: #a5affb;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 2%;
`;

const ModalContainer = styled.div`
  width: 100%;
  height: auto;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const ModalTitle = styled(Heading2)`
  margin-left: 5%;
`;

const PageContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: center;
`;
