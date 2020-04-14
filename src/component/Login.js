import React, { Component } from "react";
import styled from "styled-components";
import {
  ButtonText,
  Heading3,
  ModalLogo,
  LoginButton,
  FormInput,
  FormInputPassword,
} from "./Layout.js";
//Ant Design
import { Card, Form } from "antd";
//firebase
import { auth } from "../firebase/firebase.js";
//Assets
import LogoLarge from "./../assets/Logo/logoLarge.png";

export default class Login extends Component {
  formRef = React.createRef();

  state = {
    email: "",
    name: "",
    organization: "",
    password: "",
    confirmPassword: "",
    authAccess: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmitLogin = () => {
    auth.signInWithEmailAndPassword(this.state.email, this.state.password);
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user)
        this.setState({
          authAccess: true,
        });
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.authAccess ? (
          <Heading3 style={{ textAlign: "center" }}>
            Welcome Back , Admin
          </Heading3>
        ) : (
          <>
            <Heading3 style={{ textAlign: "center" }}>
              WELCOME BACK TO CO-MAKE
            </Heading3>
            <ModalLogo src={LogoLarge} />
            <br />
            <br />
            <Form>
              <Form.Item name="email">
                <FormInput
                  size="large"
                  placeholder="Email"
                  style={{ marginLeft: "50px" }}
                  id="email"
                  onChange={this.handleChange.bind(this)}
                />
              </Form.Item>
              <Form.Item name="password">
                <FormInputPassword
                  size="large"
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
                  onClick={this.props.handleRegister}
                >
                  Dont have an account?
                </ButtonText>
                <br />
                <LoginButton type="primary" onClick={this.handleSubmitLogin}>
                  <ButtonText>Log in</ButtonText>
                </LoginButton>
              </Form.Item>
            </Form>
          </>
        )}
      </React.Fragment>
    );
  }
}
