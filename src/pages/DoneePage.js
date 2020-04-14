import React, { Component } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";

//Assets
import backgroundDonee from "../assets/BgDonee.png";
import imageDonee from "../assets/ImgDonee.png";
import LogoLarge from "../assets/logo/logoLarge.png";

import LoginModal from "./../component/LoginModal";
//Ant Design
import { Card, Input, Row, Col, Dropdown, Menu, message } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { auth, db } from "./../firebase/firebase";

//Layout
import {
  Header,
  CoMakeLogo,
  CoMakeTitle,
  ButtonText,
  Caption,
  Heading2,
  Banner,
  NavText,
  CoMakeButton,
  Heading3,
  Body,
} from "../component/Layout.js";

export default class DoneePage extends Component {
  state = {
    visible: false,
    visibleMenu: false,
    redirect: false,
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

  handleSubmitSignUp = () => {
    if (
      this.state.email != "" &&
      this.state.organization != "" &&
      String(this.state.password) == String(this.state.confirmPassword)
    ) {
      auth
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((cred) => {
          return db.collection("users").doc(cred.user.uid).set({
            name: this.state.name,
            organization: this.state.organization,
            email: this.state.email,
          });
        });
    } else {
      message.error("Invalid email or password. Please reenter.");
    }
  };

  handleSubmitStart = () => {
    if (
      this.state.email != "" &&
      this.state.organization != "" &&
      String(this.state.password) == String(this.state.confirmPassword)
    ) {
      auth
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((cred) => {
          return db.collection("users").doc(cred.user.uid).set({
            name: this.state.name,
            organization: this.state.organization,
            email: this.state.email,
          });
        })
        .then(() => {
          this.setState({
            redirect: true,
          });
        });
    } else {
      message.error("Invalid email or password. Please reenter.");
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
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
    if (this.state.redirect) return <Redirect to="/admin/donate" />;
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
            <NavText onClick={this.handleOpen.bind(this, true)}>Login</NavText>
          )}
        </Header>

        <Banner style={{ backgroundImage: `url(${backgroundDonee})` }}>
          <LoginModal
            visible={this.state.visible}
            handleOpen={this.handleOpen}
          />

          <CardContainer>
            <TabContainer>
              <Heading2>Register as a Donee</Heading2>
              <br />
              <Form ref={this.formRef}>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your email!",
                    },
                  ]}
                >
                  <FormInput
                    size="large"
                    placeholder="Email"
                    style={{ width: "98%" }}
                    defaultValue={this.state.email}
                    id="email"
                    onChange={this.handleChange.bind(this)}
                  />
                </Form.Item>

                <Form.Item
                  name="organization"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your organization!",
                    },
                  ]}
                >
                  <FormInput
                    size="large"
                    placeholder="Organization"
                    style={{ width: "98%" }}
                    defaultValue={this.state.organization}
                    id="organization"
                    onChange={this.handleChange.bind(this)}
                  />
                </Form.Item>

                <Form.Item name="name">
                  <FormInput
                    size="large"
                    placeholder="Name"
                    style={{ width: "98%" }}
                    id="name"
                    onChange={this.handleChange.bind(this)}
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your password!",
                    },
                  ]}
                >
                  <FormInputPassword
                    size="large"
                    placeholder="Password"
                    style={{ width: "98%" }}
                    id="password"
                    onChange={this.handleChange.bind(this)}
                  />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  rules={[
                    {
                      required: true,
                      message: "Reenter your password",
                    },
                  ]}
                >
                  <FormInputPassword
                    size="large"
                    placeholder="Confirm Password"
                    style={{ width: "98%" }}
                    id="confirmPassword"
                    onChange={this.handleChange.bind(this)}
                  />
                </Form.Item>
                <Form.Item>
                  <Checkbox>
                    By creating an account you agree to our Terms and Condition
                    and Privacy Policy
                  </Checkbox>

                  <br />
                  <br />
                  {this.state.authAccess ? (
                    <StartedButton
                      type="primary"
                      onClick={this.handleSubmitSignUp.bind(this)}
                      style={{ width: "90%" }}
                      disabled
                    >
                      <ButtonText>You had registerd as an Admin</ButtonText>
                    </StartedButton>
                  ) : (
                    <StartedButton
                      type="primary"
                      onClick={this.handleSubmitStart.bind(this)}
                      style={{ width: "90%" }}
                    >
                      <ButtonText>Get Started</ButtonText>
                    </StartedButton>
                  )}
                </Form.Item>
              </Form>

              {/* <ButtonContainer>
                <ButtonStart
                  type="primary"
                  onClick={this.handleOpen.bind(this)}
                >
                  <ButtonText>Get Started</ButtonText>
                </ButtonStart>
              </ButtonContainer> */}
            </TabContainer>
          </CardContainer>
        </Banner>
        <DescrpContainer>
          <Row>
            <Col span={10} offset={2}>
              <Heading3 style={{ color: "#333333" }}>
                Why become a donee on Co-Make?
              </Heading3>
              <Body style={{ color: "#666666" }}>
                No matter what kind of donation you have to request, Co-Make
                makes it simple and secure. You’re in full control of your
                donation amount , donation rules , and how you interact with the
                donor.
              </Body>
            </Col>
            <Col span={10} offset={1}>
              <Heading3 style={{ color: "#333333" }}>
                What Co-Make provided?
              </Heading3>
              <Body style={{ color: "#666666" }}>
                To keep you, your home, and your belongings safe, we cover every
                booking with $1M USD in property damage protection and another
                $1M USD in insurance against accidents.
              </Body>
            </Col>
          </Row>
        </DescrpContainer>
        <StepContainer>
          <Heading2 style={{ textAlign: "center", color: "#333333" }}>
            Request for donation in three steps
          </Heading2>
          <br />
          <Row>
            <Col span={6} offset={2} xs>
              <Heading3 style={{ color: "#333333", whiteSpace: "nowrap" }}>
                1.Regester as an donee in Co-Make
              </Heading3>
              <Body style={{ color: "#666666" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                neque ipsum, egestas ac nunc in, consequat auctor urna. Mauris
                dignissim lacinia blandit. Sed in felis a nisi luctus pretium
                nec ac massa. Vestibulum ullamcorper velit nisl, vitae aliquet
                nunc vehicula vitae. Vestibulum imperdiet ante id mauris
                pulvinar, ac auctor lectus mollis.
              </Body>
            </Col>
            <Col span={6} offset={2} xs>
              <Heading3 style={{ color: "#333333" }}>
                2.Create a donation
              </Heading3>

              <Body style={{ color: "#666666" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                neque ipsum, egestas ac nunc in, consequat auctor urna. Mauris
                dignissim lacinia blandit. Sed in felis a nisi luctus pretium
                nec ac massa. Vestibulum ullamcorper velit nisl, vitae aliquet
                nunc vehicula vitae. Vestibulum imperdiet ante id mauris
                pulvinar, ac auctor lectus mollis.
              </Body>
            </Col>
            <Col span={6} offset={1} xs>
              <Heading3 style={{ color: "#333333" }}>
                3.Publish the donation
              </Heading3>

              <Body style={{ color: "#666666" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                neque ipsum, egestas ac nunc in, consequat auctor urna. Mauris
                dignissim lacinia blandit. Sed in felis a nisi luctus pretium
                nec ac massa. Vestibulum ullamcorper velit nisl, vitae aliquet
                nunc vehicula vitae. Vestibulum imperdiet ante id mauris
                pulvinar, ac auctor lectus mollis.
              </Body>
            </Col>
          </Row>
        </StepContainer>
        <ImageContainer>
          <Heading2 style={{ color: "#DDDDDD" }}>Ask for donation?</Heading2>
          <Body style={{ marginTop: "-20px", color: "#DDDDDD" }}>
            We are here to help
          </Body>
          <ImageButton
            type="primary"
            onClick={this.handleOpen.bind(this, true)}
          >
            <ButtonText>Get Started</ButtonText>
          </ImageButton>
        </ImageContainer>
      </>
    );
  }
}

const CardContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TabContainer = styled(Card)`
  width: 500px;
  height: auto;
  margin-left: -80px;

  position: absolute;
  background-color: white;
  border-radius: 10px;
`;

const StartedButton = styled(LoginButton)`
  width: 98% !important;
  margin-left: 0px;
  margin-top: 5px;
`;

const DescrpContainer = styled.div`
  width: 100%;
  height: auto;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const StepContainer = styled.div`
  width: 100%;
  height: auto;
  margin-top: 50px;
  margin-bottom: 30px;
`;

const ImageContainer = styled.div`
  width: 85%;
  height: 180px;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${imageDonee});
  margin-left: 8%;
  margin-bottom: 20px;
  padding-top: 30px;
  padding-left: 20px;
`;

const ImageButton = styled(CoMakeButton)`
  background-color: #6979f8;
  margin-top: 1%;
  :hover {
    background-color: #a5affb;
  }

  :focus {
    background-color: #a5affb;
  }
`;
