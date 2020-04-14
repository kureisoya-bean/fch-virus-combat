import React, { Component } from "react";
import styled from "styled-components";

//pages
import TViewer from "./TViewer.js";
//assets
import tdesign from "../assets/Model/model_content.png";

//components
//Layout
import {
  ButtonText,
  Heading2,
  Heading3,
  Caption,
  SelectBar,
  CoMakeButton,
  CoMakeCard,
  CoMakeCardImg,
  Banner,
  NavText,
  NavContainer,
  Body,
  Heading4,
} from "../component/Layout.js";

//Ant Design
import {
  Card,
  Input,
  Select,
  Row,
  Col,
  Modal,
  Form,
  Checkbox,
  Avatar,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

//Asset
import logo from "../assets/logo.png";

const { Meta } = Card;

export default class ViewerPage extends Component {
  state = {
    visible: false,
    loginAccess: true,
    email: "",
    name: "",
    organization: "",
    password: "",
    confirmPassword: "",
    modelList: [
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
  };

  handleOpen = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleRegister = () => {
    this.setState(
      {
        loginAccess: false,
      },
      () => {
        console.log(this.state.email);
      }
    );
  };

  handleLogin = () => {
    this.setState({
      loginAccess: true,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  renderForm = () => {
    if (this.state.loginAccess) {
      return (
        <React.Fragment>
          <Heading3 style={{ textAlign: "center" }}>
            WELCOME BACK TO CO-MAKE
          </Heading3>
          <ModalLogo src={logo} />
          <br />
          <br />
          <Form>
            <Form.Item name="email">
              <FormInput
                placeholder="Email"
                style={{ marginLeft: "50px" }}
                id="email"
                onChange={this.handleChange.bind(this)}
              />
            </Form.Item>
            <Form.Item name="password">
              <FormInput
                placeholder="Password"
                style={{ marginLeft: "50px" }}
                id="password"
                onChange={this.handleChange.bind(this)}
              />
            </Form.Item>
            <Form.Item>
              <ButtonText
                style={{
                  marginLeft: "50px",
                  color: "#6979F8",
                  cursor: "pointer",
                }}
                onClick={this.handleRegister.bind(this)}
              >
                Dont have an account?
              </ButtonText>
              <br />
              <LoginButton type="primary">
                <ButtonText>Log in</ButtonText>
              </LoginButton>
            </Form.Item>
          </Form>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Heading3 style={{ textAlign: "center" }}>NEW ACCOUNT</Heading3>
          <br />
          <Form>
            <Form.Item name="email">
              <FormInput
                placeholder="Email"
                style={{ marginLeft: "50px" }}
                id="email"
                onChange={this.handleChange.bind(this)}
              />
            </Form.Item>
            <Form.Item name="organization">
              <FormInput
                placeholder="Organization"
                style={{ marginLeft: "50px" }}
                id="organization"
                onChange={this.handleChange.bind(this)}
              />
            </Form.Item>
            <Form.Item name="name">
              <FormInput
                placeholder="Name"
                style={{ marginLeft: "50px" }}
                id="name"
                onChange={this.handleChange.bind(this)}
              />
            </Form.Item>
            <Form.Item name="password">
              <FormInput
                placeholder="Password"
                style={{ marginLeft: "50px" }}
                id="password"
                onChange={this.handleChange.bind(this)}
              />
            </Form.Item>
            <Form.Item name="confirmPassword">
              <FormInput
                placeholder="Confirm Password"
                style={{ marginLeft: "50px" }}
                id="confirmPassword"
                onChange={this.handleChange.bind(this)}
              />
            </Form.Item>
            <Form.Item>
              <ButtonText
                style={{
                  marginLeft: "50px",
                  color: "#6979F8",
                  cursor: "pointer",
                }}
                onClick={this.handleLogin.bind(this)}
              >
                Have an account?
              </ButtonText>

              <Checkbox style={{ marginLeft: "50px" }}>
                By creating an account you agree to our Terms and Condition and
                Privacy Policy
              </Checkbox>

              <br />
              <br />
              <LoginButton type="primary">
                <ButtonText>Sign Up</ButtonText>
              </LoginButton>
            </Form.Item>
          </Form>
        </React.Fragment>
      );
    }
  };
  renderModalContent = () => {
    let modelList = [];
    this.state.modelList.map((eachModel) => {
      modelList.push(
        <Col span={7} offset={1}>
          <CoMakeCard
            cover={<img alt="Modal" src={tdesign} />}
            hoverable
            bodyStyle={{ paddingTop: "10px" }}
            style={{ marginBottom: "30px" }}
          >
            <Meta
              title={<ButtonText>{eachModel.name}</ButtonText>}
              description={
                <Caption style={{ color: "#666666", marginTop: "-6px" }}>
                  {eachModel.organization} .{eachModel.uploadDate}d ago
                </Caption>
              }
            />
          </CoMakeCard>
        </Col>
      );
    });
    return modelList;
  };

  render() {
    return (
      <>
        <HeadContainer>
          <NavContainer>
            <NavText>Raise a Fund</NavText>
            <NavText>3D Design</NavText>
            <NavText onClick={this.handleOpen.bind(this)}>Login</NavText>
          </NavContainer>
        </HeadContainer>
        <Modal
          visible={this.state.visible}
          title={null}
          onCancel={this.handleCancel}
          footer={null}
        >
          {this.renderForm()}
        </Modal>
        <TViewer />
        <InfoCard
          bodyStyle={{
            paddingTop: "10px",
          }}
        >
          <Avatar
            icon={<UserOutlined />}
            style={{ float: "left", marginRight: "10px" }}
          />
          <Body>Created By</Body>
          <Heading4 style={{ marginTop: "-10px" }}>
            World Healthy Organization
          </Heading4>
          <ButtonDownload
            style={{ float: "right", marginTop: "-50px" }}
            type="primary"
          >
            <ButtonText>Download</ButtonText>
          </ButtonDownload>
        </InfoCard>
        <ViewContainer>
          <ViewTitle>Suggested</ViewTitle>
          <Row>
            <Col span={7} offset={21}>
              <ShowButton>Show More>></ShowButton>
            </Col>
          </Row>
          <Row>
            {this.renderModalContent()}
            {this.renderModalContent()}
          </Row>
        </ViewContainer>
      </>
    );
  }
}

const HeadContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: rgb(0, 0, 0, 0.85);
`;

const InfoCard = styled(Card)`
  width: 100%;
  height: 70px;
`;

const ButtonDownload = styled(CoMakeButton)`
  background-color: #6979f8;

  :hover {
    background-color: #a5affb;
  }

  :focus {
    background-color: #a5affb;
  }
`;

const ViewContainer = styled.div`
  width: 100%;
  height: auto;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const ViewTitle = styled(Heading2)`
  margin-left: 5%;
`;

const ModalLogo = styled.img`
  display: flex;
  width: 100px;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
`;

const FormInput = styled(Input)`
  width: 80%;
  height: 44px;
  border-radius: 10px;
`;

const LoginButton = styled(CoMakeButton)`
  width: 80%;
  height: 48px;
  margin-left: 50px;
  background-color: #6979f8;

  :hover {
    background-color: #a5affb;
  }

  :focus {
    background-color: #a5affb;
  }
`;

const ShowButton = styled(ButtonText)`
  color: #666666;
  &:hover {
    color: rgb(0, 0, 0, 0.85);
  }
`;
