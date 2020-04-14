import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import LoginModal from "./../component/LoginModal";

//Assets
import logo from "../assets/logo/logo.png";
import machine from "../assets/Donate/donate_money.png";
import money from "../assets/Donate/donate_money.png";
import mask from "../assets/Donate/donate_mask.png";
import who from "../assets/Donate/donate_bg3.png";
import video1 from "../assets/Donate/donate_bg1.png";
import image1 from "../assets/Donate/donate_bg2.png";

//Layout
import {
  ButtonText,
  Header,
  CoMakeLogo,
  Heading1,
  Heading2,
  Heading3,
  Caption,
  NavText,
  NavContainer,
  Banner,
  Body,
  CoMakeButton,
  CoMakeCardImg,
  NavLogo,
  ModalLogo,
  FormInput,
  FormInputPassword,
  LoginButton,
} from "../component/Layout.js";

//Ant Design
import {
  Card,
  Modal,
  Form,
  Row,
  Col,
  Select,
  Steps,
  Dropdown,
  Menu,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

//firebase
import { auth } from "../firebase/firebase.js";

const { Meta } = Card;
const { Option } = Select;
const { Step } = Steps;

export default class ExplorePage extends Component {
  state = {
    visible: false,
    loginAccess: true,
    donateVisiblity: false,
    stepsIndex: 0,
    donationType: "money",
  };

  state = {
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
  handleDonationType = (selectedType) => {
    this.setState({ donationType: selectedType });
  };

  handleDonate = (bool) => {
    this.setState({
      donateVisiblity: bool,
      stepsIndex: 0,
    });
  };

  handleNextSteps = (index) => {
    this.setState({
      stepsIndex: index,
    });
  };

  handleVisibleChange = (flag) => {
    this.setState({ visibleMenu: flag });
  };

  renderDonateForm = () => {
    return (
      <React.Fragment>
        <Heading3 style={{ textAlign: "center" }}>Donation</Heading3>
        {this.state.donationType === "money" && (
          <Steps current={this.state.stepsIndex} style={{ marginTop: "10px" }}>
            <Step title="Personal Info" />
            <Step title="Bank Info" />
            <Step title="Done" />
          </Steps>
        )}
        {this.state.donationType === "printer" && (
          <Steps
            size="small"
            current={this.state.stepsIndex}
            style={{ marginTop: "10px" }}
          >
            <Step title="Personal Info" />
            <Step title="Enter Your Address" />
            <Step title="Enter Your Info" />
            <Step title="Done" />
          </Steps>
        )}
        {this.state.donationType === "mask" && (
          <Steps current={this.state.stepsIndex} style={{ marginTop: "10px" }}>
            <Step title="Personal Info" />
            <Step title="Enter Your Info" />
            <Step title="Done" />
          </Steps>
        )}
        <br />
        <br />
        {this.renderDonationContent()}
      </React.Fragment>
    );
  };

  renderDonationContent = () => {
    if (this.state.stepsIndex === 0)
      return (
        <Form style={{ marginTop: "50px" }}>
          <Form.Item name="email">
            <FormInput style={{ marginLeft: "50px" }} placeholder="Email" />
          </Form.Item>
          <Form.Item name="dropdown">
            <FormDropDown
              onChange={this.handleDonationType}
              style={{ marginLeft: "50px" }}
            >
              <Option value="money">Money</Option>
              <Option value="printer">3D Printer</Option>
              <Option value="mask">Mask</Option>
            </FormDropDown>
          </Form.Item>
          <Form.Item>
            <br />
            <br />
            <Button type="primary" onClick={this.handleNextSteps.bind(this, 1)}>
              <ButtonText>Next</ButtonText>
            </Button>
          </Form.Item>
        </Form>
      );
    else if (
      this.state.stepsIndex === 1 &&
      this.state.donationType === "money"
    ) {
      return (
        <Form>
          <Form.Item name="cardNumber">
            <FormInput
              style={{ marginLeft: "50px" }}
              placeholder="Card Number"
            />
          </Form.Item>
          <Form.Item name="cardName">
            <FormInput style={{ marginLeft: "50px" }} placeholder="Card Name" />
          </Form.Item>
          <Form.Item>
            <FormInput
              style={{ marginLeft: "50px" }}
              placeholder="MM/YYYY"
              style={{ width: "130px" }}
            />
            <FormInput
              style={{ marginLeft: "50px" }}
              placeholder="CVV"
              style={{ marginLeft: "20px", width: "230px" }}
            />
          </Form.Item>
          <Form.Item name="amount">
            <FormInput style={{ marginLeft: "50px" }} placeholder="Amount" />
          </Form.Item>
          <Form.Item>
            <NavigateButton
              type="primary"
              style={{ position: "absolute", left: 0 }}
              onClick={this.handleNextSteps.bind(this, 0)}
            >
              <ButtonText>Back</ButtonText>
            </NavigateButton>
            <NavigateButton
              type="primary"
              style={{ position: "absolute", right: 0 }}
              onClick={this.handleNextSteps.bind(this, 2)}
            >
              <ButtonText>Next</ButtonText>
            </NavigateButton>
          </Form.Item>
        </Form>
      );
    } else if (
      this.state.stepsIndex === 1 &&
      this.state.donationType === "printer"
    ) {
      return (
        <Form>
          <Form.Item name="country">
            <FormInput style={{ marginLeft: "50px" }} placeholder="Country" />
          </Form.Item>
          <Form.Item name="address">
            <FormInput style={{ marginLeft: "50px" }} placeholder="Address" />
          </Form.Item>
          <Form.Item>
            <FormInput
              style={{ marginLeft: "50px" }}
              placeholder="City"
              style={{ width: "130px" }}
            />
            <FormInput
              style={{ marginLeft: "50px" }}
              placeholder="State"
              style={{ marginLeft: "20px", width: "230px" }}
            />
          </Form.Item>
          <Form.Item name="zip">
            <FormInput style={{ marginLeft: "50px" }} placeholder="Zip Code" />
          </Form.Item>
          <Form.Item>
            <NavigateButton
              type="primary"
              style={{ position: "absolute", left: 0 }}
              onClick={this.handleNextSteps.bind(this, 0)}
            >
              <ButtonText>Back</ButtonText>
            </NavigateButton>
            <NavigateButton
              type="primary"
              style={{ position: "absolute", right: 0 }}
              onClick={this.handleNextSteps.bind(this, 2)}
            >
              <ButtonText>Next</ButtonText>
            </NavigateButton>
          </Form.Item>
        </Form>
      );
    } else if (
      this.state.stepsIndex === 2 &&
      this.state.donationType === "printer"
    ) {
      return (
        <Form>
          <Form.Item name="name">
            <FormInput style={{ marginLeft: "50px" }} placeholder="Name" />
          </Form.Item>
          <Form.Item name="phoneNo">
            <FormInput
              style={{ marginLeft: "50px" }}
              placeholder="Phone Number"
            />
          </Form.Item>
          <Form.Item>
            <Caption style={{ marginLeft: "50px", fontWeight: "bold" }}>
              Rental Time
            </Caption>
            <FormInput
              style={{ marginLeft: "50px" }}
              placeholder="Start Date"
              style={{ width: "130px" }}
            />
            <FormInput
              style={{ marginLeft: "50px" }}
              placeholder="End Date"
              style={{ marginLeft: "20px", width: "230px" }}
            />
          </Form.Item>
          <Form.Item>
            <NavigateButton
              type="primary"
              style={{ position: "absolute", left: 0, marginTop: "45px" }}
              onClick={this.handleNextSteps.bind(this, 1)}
            >
              <ButtonText>Back</ButtonText>
            </NavigateButton>
            <NavigateButton
              type="primary"
              style={{ position: "absolute", right: 0, marginTop: "45px" }}
              onClick={this.handleNextSteps.bind(this, 3)}
            >
              <ButtonText>Next</ButtonText>
            </NavigateButton>
          </Form.Item>
        </Form>
      );
    } else if (
      this.state.stepsIndex === 1 &&
      this.state.donationType === "mask"
    ) {
      return (
        <Form>
          <Form.Item name="name">
            <FormInput style={{ marginLeft: "50px" }} placeholder="Name" />
          </Form.Item>
          <Form.Item name="phoneNo">
            <FormInput style={{ marginLeft: "50px" }} placeholder="Phone No" />
          </Form.Item>
          <Form.Item name="collectTime">
            <FormInput
              style={{ marginLeft: "50px" }}
              placeholder="Collect Time"
            />
          </Form.Item>
          <Form.Item name="amount">
            <FormInput style={{ marginLeft: "50px" }} placeholder="Amount" />
          </Form.Item>
          <Form.Item>
            <NavigateButton
              type="primary"
              style={{ position: "absolute", left: 0 }}
              onClick={this.handleNextSteps.bind(this, 0)}
            >
              <ButtonText>Back</ButtonText>
            </NavigateButton>
            <NavigateButton
              type="primary"
              style={{ position: "absolute", right: 0 }}
              onClick={this.handleNextSteps.bind(this, 2)}
            >
              <ButtonText>Next</ButtonText>
            </NavigateButton>
          </Form.Item>
        </Form>
      );
    } else {
      this.handleDonate(false);
    }
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
        <Banner style={{ background: "#000" }}>
          <Link to="/" style={{ cursor: "pointer" }}>
            <NavLogo src={logo} alt="logo" />

            <ButtonText style={{ marginLeft: 10, color: "#6979F8" }}>
              Co-Make
            </ButtonText>
          </Link>
          <NavContainer>
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
          </NavContainer>

          <LoginModal
            visible={this.state.visible}
            handleOpen={this.handleOpen}
          />

          <div>
            <Row
              gutter={15}
              style={{
                height: "600px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Col>
                <img src={who} alt="who" />
              </Col>
              <Col>
                <img src={video1} alt="video" />
              </Col>
              <Col>
                <Col span={24}>
                  <img src={image1} alt="image1" />
                </Col>

                <Col span={24} style={{ marginTop: "10px" }}>
                  <img src={image1} alt="image2" />
                </Col>
              </Col>
            </Row>
          </div>
          <Row style={{ marginTop: "-30px" }}>
            <Col span={18}>
              <OrganizationTitle>
                WHO (World Heath Organization)
              </OrganizationTitle>
              <OrganizationSubtitle>Geneva, Switzerland</OrganizationSubtitle>
            </Col>
            <Col>
              <DonateButton
                type="primary"
                onClick={this.handleDonate.bind(this, true)}
              >
                <ButtonText>Donate</ButtonText>
              </DonateButton>
            </Col>
          </Row>
        </Banner>
        <Container>
          <DonationTitle>Description</DonationTitle>
          <DonationBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            vestibulum maximus nisl at vulputate. Integer ullamcorper, velit ac
            efficitur fringilla, nunc dui dignissim lorem, ac scelerisque leo mi
            ac augue. Aenean eget venenatis ligula, nec porta libero. Ut luctus
            lacus mauris, ut suscipit sapien consectetur id. Mauris elementum
            nibh at dui vestibulum, ut iaculis est placerat. Sed tellus tortor,
            congue auctor orci sed, commodo semper risus. In ornare metus
            ultricies eros cursus pellentesque.
            <br />
            <br />
            Cras efficitur tristique est ac congue. Interdum et malesuada fames
            ac ante ipsum primis in faucibus. Quisque elementum erat sit amet
            turpis eleifend ultricies. Duis ante metus, luctus sed dignissim
            quis, aliquet nec ipsum. Interdum et malesuada fames ac ante ipsum
            primis in faucibus. Orci varius natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus. Duis molestie quam et
            felis aliquet pharetra. Class aptent taciti sociosqu ad litora
            torquent per conubia nostra, per inceptos himenaeos. Donec volutpat
            at tellus non eleifend. Sed ultrices mauris eget augue molestie, at
            pretium magna rutrum.
          </DonationBody>
        </Container>
        <Container>
          {/* <Row gutter={8}>
            <Col span={7} offset={1}>
              <CoMakeCard
                cover={<CoMakeCardImg alt="Money" src={money} />}
                hoverable
              >
                <Meta
                  title={<ButtonText>Money</ButtonText>}
                  style={{
                    textAlign: "center",
                  }}
                />
              </CoMakeCard>
            </Col>
            <Col span={7} offset={1}>
              <CoMakeCard
                cover={<CoMakeCardImg alt="3D Machine Rent" src={machine} />}
                hoverable
              >
                <Meta
                  title={<ButtonText>3D Machine (Rent) </ButtonText>}
                  style={{
                    textAlign: "center",
                  }}
                />
              </CoMakeCard>
            </Col>
            <Col span={7} offset={1}>
              <CoMakeCard
                cover={<CoMakeCardImg alt="Mask" src={mask} />}
                hoverable
              >
                <Meta
                  title={<ButtonText>Mask</ButtonText>}
                  style={{
                    textAlign: "center",
                  }}
                />
              </CoMakeCard>
            </Col>
          </Row> */}
          <Modal
            visible={this.state.donateVisiblity}
            title={null}
            onCancel={this.handleDonate.bind(this, false)}
            footer={null}
          >
            <div style={{ height: "440px" }}>{this.renderDonateForm()}</div>
          </Modal>
        </Container>
      </>
    );
  }
}

const Container = styled.div`
  width: 100%;
  height: auto;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const OrganizationTitle = styled(Heading1)`
  margin-left: 5.2%;
  color: white;
`;

const OrganizationSubtitle = styled(Heading3)`
  margin-left: 5.3%;
  color: white;
`;

const DonationTitle = styled(Heading2)`
  margin-left: 4%;
`;

const DonationBody = styled(Body)`
  margin-top: 10px;
  margin-left: 4%;
`;

const Button = styled(CoMakeButton)`
  width: 80%;
  height: 48px;
  margin-left: 50px;
  background-color: #6979f8;
  border-radius: 10px;

  :hover {
    background-color: #a5affb;
  }

  :focus {
    background-color: #a5affb;
  }
`;

const FormDropDown = styled(Select)`
  width: 377.6px !important;
  height: 44px;
`;

const DonateButton = styled(CoMakeButton)`
  height: 44px;
  margin-left: 50px;
  background-color: #6979f8;
  border-radius: 10px;
  :hover {
    background-color: #a5affb;
  }

  :focus {
    background-color: #a5affb;
  }
`;

const NavigateButton = styled(CoMakeButton)`
  height: 44px;
  background-color: #6979f8;
  border-radius: 10px;
  width: 100px;

  :hover {
    background-color: #a5affb;
  }

  :focus {
    background-color: #a5affb;
  }
`;
