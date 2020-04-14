import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { Divider, Col, Row, Card, Steps, Modal, Form, Input, Spin } from "antd";
import {
  CoMakeButton,
  ButtonText,
  Heading1,
  Heading2,
  Heading3,
  Body,
  CoMakeCard,
  CoMakeCardImg,
} from "./../../component/Layout";
//Assets
import hospital from "./../../assets/Donate/donate_bg2.png";
import machine from "./../../assets/Donate/donate_money.png";
import money from "./../../assets/Donate/donate_money.png";
import mask from "./../../assets/Donate/donate_mask.png";
import who from "./../../assets/Donate/donate_bg3.png";
import video1 from "./../../assets/Donate/donate_bg1.png";
import image1 from "./../../assets/Donate/donate_bg2.png";

//firebase
import firebase from "./../../firebase/firebase";

const { Meta } = Card;
const { Step } = Steps;
const { TextArea } = Input;

class editDonation extends Component {
  state = {
    visible: false,
    stepsIndex: 0,
    donationDetails: [],
    title: "",
    location: "",
    description: "",
    money: "",
    printer: "",
    mask: "",
  };

  componentDidMount = async () => {
    let pathList = window.location.pathname.split("/");

    if (pathList.length > 1) {
      let length = pathList.length;
      const db = firebase.firestore();

      db.collection("donation").onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();
        changes.map((change) => {
          if (
            change.type === "added" &&
            change.doc.id === pathList[length - 1]
          ) {
            this.setState(
              {
                title: change.doc.data().donationName,
                description: change.doc.data().donationDescription,
                location: change.doc.data().donationLocation,
                money: change.doc.data().donationAmount,
                printer: change.doc.data().donationPrinter,
                mask: change.doc.data().donationMask,
                ownerId: change.doc.data().donationOwner,
                image: hospital,
                key: change.doc.id,
              },
              () => {}
            );
          }
        });
      });
    }
  };

  handleNextSteps = (index) => {
    this.setState(
      {
        stepsIndex: index,
      },
      () => {}
    );
  };

  updateInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleUpdate = () => {
    const db = firebase.firestore();

    db.collection("donation")
      .doc(this.state.key)
      .update({
        donationName: this.state.title,
        donationDescription: this.state.description,
        donationLocation: this.state.location,
        donationAmount: this.state.money,
        donationMask: this.state.mask,
        donationPrinter: this.state.printer,
        donationOwner: this.state.ownerId,
      })
      .then(() => {
        window.location.reload();
      });
  };

  handleDonate = (bool) => {
    this.setState({
      visible: bool,
      stespIndex: 0,
    });
  };

  renderFormContent = () => {
    if (this.state.stepsIndex === 0)
      return (
        <Form>
          <Form.Item>
            <FormText>Title</FormText>
            <FormInput
              onChange={this.updateInput}
              id="title"
              value={this.state.title}
              placeholder="Title"
            />
            <FormText style={{ position: "absolute", right: "140px", top: 0 }}>
              Location
            </FormText>
            <FormInput
              style={{ float: "right" }}
              id="location"
              onChange={this.updateInput}
              value={this.state.location}
              placeholder="Location"
            />
          </Form.Item>
          <Form.Item name="description">
            <FormText>Description</FormText>
            <TextArea
              id="description"
              onChange={this.updateInput}
              value={this.state.description}
              placeholder="Description"
              style={{ width: "45%", height: "100px" }}
            />
            <NavigateButton
              type="primary"
              style={{ right: 0, bottom: 0 }}
              onClick={this.handleNextSteps.bind(this, 1)}
            >
              <ButtonText>Next</ButtonText>
            </NavigateButton>
          </Form.Item>
        </Form>
      );
    else if (this.state.stepsIndex === 1)
      return (
        <Form>
          <Form.Item>
            <FormText>Money</FormText>
            <FormInput
              id="money"
              value={this.state.money}
              placeholder="Quantity"
              onChange={this.updateInput}
            />
            <FormText style={{ position: "absolute", right: "140px", top: 0 }}>
              3D Printer
            </FormText>
            <FormInput
              id="printer"
              value={this.state.printer}
              style={{ float: "right" }}
              placeholder="Quantity"
              onChange={this.updateInput}
            />
          </Form.Item>
          <Form.Item name="description">
            <FormText>Mask</FormText>
            <FormInput
              value={this.state.mask}
              id="mask"
              placeholder="Quantity"
              onChange={this.updateInput}
            />
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
              onClick={this.handleUpdate}
            >
              <ButtonText>Next</ButtonText>
            </NavigateButton>
          </Form.Item>
        </Form>
      );
    else if (this.state.stepsIndex === 2)
      return (
        <FormContainer>
          <Spin size="large" />
        </FormContainer>
      );
  };

  renderForm = () => {
    return (
      <React.Fragment>
        <Heading3 style={{ textAlign: "center" }}>Donation</Heading3>
        <Steps current={this.state.stepsIndex} style={{ marginTop: "10px" }}>
          <Step title="Details" />
          <Step title="Materials" />
          <Step title="Done" />
        </Steps>
        <br />
        {this.renderFormContent()}
      </React.Fragment>
    );
  };

  render() {
    return (
      <>
        <Header>
          {this.state.title && <Title>Donation / {this.state.title}</Title>}
          <AddButton
            type="primary"
            onClick={this.handleDonate.bind(this, true)}
          >
            <ButtonText>EDIT</ButtonText>
          </AddButton>
        </Header>
        <Divider />

        <Modal
          visible={this.state.visible}
          title={null}
          onCancel={this.handleDonate.bind(this, false)}
          footer={null}
        >
          {this.renderForm()}
        </Modal>

        <Container>
          <Row
            gutter={15}
            style={{
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
          <OrganizationTitle>{this.state.title}</OrganizationTitle>
          <OrganizationSubtitle>{this.state.location}</OrganizationSubtitle>

          <DonationTitle>Description</DonationTitle>
          <DonationBody>{this.state.description}</DonationBody>
          <Row gutter={8}>
            <Col span={7} offset={1}>
              <CoMakeCard
                cover={<CoMakeCardImg alt="Money" src={money} />}
                hoverable
              >
                <Meta
                  title={
                    <ButtonText>
                      Money RM<span>{this.state.money}</span>
                    </ButtonText>
                  }
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
                  title={
                    <ButtonText>
                      3D Machine (Rent) x<span>{this.state.printer}</span>
                    </ButtonText>
                  }
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
                  title={
                    <ButtonText>
                      Mask x<span>{this.state.mask}</span>
                    </ButtonText>
                  }
                  style={{
                    textAlign: "center",
                  }}
                />
              </CoMakeCard>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(editDonation);

const Container = styled.div`
  margin: 30px;
  margin-bottom: 0px;
`;

const Header = styled.div`
  height: 36px;
`;

const AddButton = styled(CoMakeButton)`
  width: 150px;
  height: 44px;
  background-color: #6979f8;
  position: absolute;
  right: 10px;
  margin: 10px;
  :hover {
    background-color: #a5affb;
  }

  :focus {
    background-color: #a5affb;
  }
`;

const Title = styled(Heading1)`
  margin-top: 10px;
  margin-left: 20px;
  position: absolute;
`;

const FormInput = styled(Input)`
  width: 45%;
  height: 44px;
`;

const FormText = styled(Body)`
  font-weight: bold;
`;

const NavigateButton = styled(CoMakeButton)`
  height: 44px;
  background-color: #6979f8;
  border-radius: 10px;
  width: 100px;
  position: absolute;
  :hover {
    background-color: #a5affb;
  }

  :focus {
    background-color: #a5affb;
  }
`;

const FormContainer = styled.div`
  display: flex;
  height: 250px;
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const OrganizationTitle = styled(Heading1)`
  margin-top: 20px;
  margin-left: 4%;
`;

const OrganizationSubtitle = styled(Heading3)`
  margin-left: 4%;
`;

const DonationTitle = styled(Heading2)`
  margin-left: 4%;
`;

const DonationBody = styled(Body)`
  margin-top: 10px;
  margin-left: 4%;
`;
