import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { Divider, Col, Row, Card, Steps, Modal, Form, Input, Spin } from "antd";
import {
  CoMakeButton,
  ButtonText,
  Heading1,
  Heading3,
  Body,
  CoMakeCard,
  CoMakeCardImg,
} from "./../../component/Layout";
//Assets
import hospital from "./../../assets/Donate/donate_bg2.png";
//firebase
import firebase from "./../../firebase/firebase";

const { Meta } = Card;
const { Step } = Steps;
const { TextArea } = Input;

class Donate extends Component {
  state = {
    donationList: [],
    visible: false,
    stepsIndex: 0,
    title: "",
    location: "",
    description: "",
    money: "",
    printer: "",
    mask: "",
  };

  componentDidMount = async () => {
    let list = [];
    const db = firebase.firestore();

    db.collection("donation").onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.map((change) => {
        if (
          change.type == "added" &&
          change.doc.data().donationOwner === this.props.auth
        ) {
          list.push({
            title: change.doc.data().donationName,
            description: change.doc.data().donationDescription,
            location: change.doc.data().donationLocation,
            money: change.doc.data().donationAmount,
            printer: change.doc.data().donationPrinter,
            mask: change.doc.data().donationMask,
            ownerId: change.doc.data().donationOwner,
            image: hospital,
            key: change.doc.id,
          });
        }
      });

      this.setState(
        {
          donationList: list,
        },
        () => {}
      );
    });
  };

  handleNextSteps = (index) => {
    this.setState(
      {
        stepsIndex: index,
      },
      () => {}
    );
  };

  handleSelectedWorld = (donationID) => {
    this.props.history.push({
      pathname: `/admin/editDonation/${donationID}`,
    });
  };

  updateInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  renderDonation = () => {
    let donationList = [];
    if (this.state.donationList.length > 0) {
      this.state.donationList.map((eachDonation) => {
        donationList.push(
          <Col span={6}>
            <CoMakeCard
              style={{ height: "auto", width: 250, marginBottom: 25 }}
              cover={
                <CoMakeCardImg
                  alt="hospital"
                  src={eachDonation.image}
                  onClick={this.handleSelectedWorld.bind(
                    this,
                    eachDonation.key
                  )}
                />
              }
              hoverable
            >
              <Meta
                title={<ButtonText>{eachDonation.title}</ButtonText>}
                style={{
                  textAlign: "center",
                }}
              />
            </CoMakeCard>
          </Col>
        );
      });
    }
    return donationList;
  };

  handleDonate = (bool) => {
    this.setState({
      visible: bool,
      stespIndex: 0,
    });
  };

  handleSubmit = async (e) => {
    this.handleNextSteps(2);

    e.preventDefault();

    const db = firebase.firestore();

    const donationRef = await db.collection("donation").add({
      donationName: this.state.title,
      donationDescription: this.state.description,
      donationLocation: this.state.location,
      donationAmount: this.state.money,
      donationMask: this.state.mask,
      donationPrinter: this.state.printer,
      donationOwner: this.props.auth,
    });

    this.setState({
      title: "",
      description: "",
      location: "",
      money: "",
      mask: "",
      printer: "",
      visible: false,
      stepsIndex: 0,
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
              onClick={this.handleSubmit}
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
          <Title>Donation</Title>
          <AddButton
            type="primary"
            onClick={this.handleDonate.bind(this, true)}
          >
            <ButtonText>ADD</ButtonText>
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
          <Row gutter={24}>{this.renderDonation()}</Row>
        </Container>
      </>
    );
  }
}

export default withRouter(Donate);

const Container = styled.div`
  margin: 30px;
  margin-bottom: 0px;
  overflow: auto;
  overflow-x: hidden;
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
