import React, { Component } from "react";
import styled from "styled-components";
import { Upload, Divider, Modal, Input } from "antd";

//Firebase
import { auth, db } from "../../firebase/firebase.js";

//Layout
import {
  CoMakeButton,
  ButtonText,
  Heading1,
  Heading3,
  Heading2,
  Heading4,
  Body,
} from "./../../component/Layout";

class Profile extends Component {
  state = {
    visible: false,
    name: "",
    organization: "",
    email: "",
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          this.setState({
            name: doc.data().name,
            organization: doc.data().organization,
            email: doc.data().email,
          });
        });
    });
  }

  handleProfileDialog = (bool) => {
    this.setState({
      visible: bool,
      stespIndex: 0,
    });
  };

  renderForm = () => {
    return (
      <React.Fragment>
        <Heading3 style={{ textAlign: "center" }}>Edit Profile</Heading3>
        <br />
        <br />
      </React.Fragment>
    );
  };

  render() {
    return (
      <>
        <Header>
          <Title>Profile</Title>
          <AddButton
            type="primary"
            onClick={this.handleProfileDialog.bind(this, true)}
          >
            <ButtonText>EDIT</ButtonText>
          </AddButton>
        </Header>
        <Divider />
        <Modal
          visible={this.state.visible}
          title={null}
          onCancel={this.handleProfileDialog.bind(this, false)}
          footer={null}
        >
          {this.renderForm()}
        </Modal>

        <Container>
          <Heading2>Account Info</Heading2>
          <Heading3>Name : {this.state.name}</Heading3>
          <Heading3>Organization : {this.state.organization}</Heading3>
          <Heading3>Email : {this.state.email}</Heading3>
        </Container>
      </>
    );
  }
}

export default Profile;

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
// const FormInput = styled(Input)`
//   width: 45%;
//   height: 44px;
// `;

// const FormText = styled(Body)`
//   font-weight: bold;
// `;
