import React, { Component } from "react";
import styled from "styled-components";
import {
  Upload,
  Divider,
  Col,
  Row,
  Card,
  Modal,
  Form,
  Steps,
  Input,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import {
  CoMakeButton,
  ButtonText,
  Heading1,
  Heading3,
  Body,
  CoMakeCard,
  CoMakeCardImg,
} from "./../../component/Layout";
import mask from "./../../assets/Donate/donate_mask.png";

const { Meta } = Card;
const { Step } = Steps;

class Designs extends Component {
  state = {
    modalList: [
      {
        name: "Mask",
        image: mask,
      },
    ],
    stepsIndex: 0,
    visible: false,
  };

  handleNextSteps = (index) => {
    this.setState({
      stepsIndex: index,
    });
  };

  handleDesigns = (bool) => {
    this.setState({
      visible: bool,
      stespIndex: 0,
    });
  };

  renderFormContent = () => {
    if (this.state.stepsIndex === 0)
      return (
        <FormContainer>
          <Form>
            <Form.Item>
              <Body>Support only glb format</Body>
              <Upload>
                <NavigateButton
                  type="primary"
                  // onClick={this.handleNextSteps.bind(this, 1)}
                >
                  <ButtonText>
                    <UploadOutlined /> Upload
                  </ButtonText>
                </NavigateButton>
              </Upload>
            </Form.Item>
          </Form>
        </FormContainer>
      );
    else if (this.state.stepsIndex === 1)
      return (
        <Form>
          <Form.Item>
            <FormText>Title</FormText>
            <FormInput placeholder="Title" />
          </Form.Item>
          <Form.Item name="description">
            <FormText>Description</FormText>
            <FormInput placeholder="Description" />
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
    else {
      this.setState({
        visible: false,
        stepsIndex: 0,
      });
    }
  };

  renderForm = () => {
    return (
      <React.Fragment>
        <Heading3 style={{ textAlign: "center" }}>3D Designs</Heading3>
        <Steps current={this.state.stepsIndex} style={{ marginTop: "10px" }}>
          <Step title="Details" />
          <Step title="Materials" />
          <Step title="Done" />
        </Steps>
        <br />
        <br />
        {this.renderFormContent()}
      </React.Fragment>
    );
  };

  render3DModal = () => {
    let modalList = [];
    if (this.state.modalList.length > 0) {
      this.state.modalList.map((eachModal) => {
        modalList.push(
          <Col span={6}>
            <CoMakeCard
              style={{ height: "auto", width: 300 }}
              cover={
                <CoMakeCardImg alt={eachModal.name} src={eachModal.image} />
              }
              hoverable
            >
              <Meta
                title={<ButtonText>{eachModal.name}</ButtonText>}
                style={{
                  textAlign: "center",
                }}
              />
            </CoMakeCard>
          </Col>
        );
      });
    }
    return modalList;
  };

  render() {
    return (
      <>
        <Header>
          <Title>3D Designs</Title>
          <AddButton
            type="primary"
            onClick={this.handleDesigns.bind(this, true)}
          >
            <ButtonText>ADD</ButtonText>
          </AddButton>
        </Header>
        <Divider />
        <Modal
          visible={this.state.visible}
          title={null}
          onCancel={this.handleDesigns.bind(this, false)}
          footer={null}
        >
          {this.renderForm()}
        </Modal>

        <Container>
          <Row gutter={24}>{this.render3DModal()}</Row>
        </Container>
      </>
    );
  }
}

export default Designs;

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
  :hover {
    background-color: #a5affb;
  }

  :focus {
    background-color: #a5affb;
  }
`;

const FormContainer = styled.div`
  display: flex;
  height: 300px;
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 5px dashed #dddddd;
`;
