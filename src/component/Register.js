import React, { Component } from "react";
import styled from "styled-components";

//Layout
import {
  ButtonText,
  Heading2,
  Heading3,
  Caption,
  CoMakeButton,
  FormInput,
  FormInputPassword,
  LoginButton,
} from "../component/Layout.js";

//Ant Design
import { Card, message, Form, Checkbox } from "antd";
//firebase
import { auth, db } from "../firebase/firebase.js";

export default class ExplorePage extends Component {
  formRef = React.createRef();
  state = {
    email: "",
    name: "",
    organization: "",
    password: "",
    confirmPassword: "",
    authAccess: false,
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user)
        this.setState({
          authAccess: true,
        });
    });
  }

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

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    return (
      <>
        {this.state.authAccess ? null : (
          <React.Fragment>
            <Heading3 style={{ textAlign: "center" }}>NEW ACCOUNT</Heading3>
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
                  style={{ marginLeft: "50px" }}
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
                  style={{ marginLeft: "50px" }}
                  id="organization"
                  onChange={this.handleChange.bind(this)}
                />
              </Form.Item>
              <Form.Item name="name">
                <FormInput
                  size="large"
                  placeholder="Name"
                  style={{ marginLeft: "50px" }}
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
                  style={{ marginLeft: "50px" }}
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
                  onClick={this.props.handleLogin}
                >
                  Have an account?
                </ButtonText>

                <Checkbox style={{ marginLeft: "50px" }}>
                  By creating an account you agree to our Terms and Condition
                  and Privacy Policy
                </Checkbox>

                <br />
                <br />
                <LoginButton
                  type="primary"
                  onClick={this.handleSubmitSignUp.bind(this)}
                >
                  <ButtonText>Sign Up</ButtonText>
                </LoginButton>
              </Form.Item>
            </Form>
          </React.Fragment>
        )}
      </>
    );
  }
}
