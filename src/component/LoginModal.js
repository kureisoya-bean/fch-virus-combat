import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";

//Ant Design
import { Modal } from "antd";

export default class LoginModal extends Component {
  state = {
    visible: false,
    register: false,
    login: false,
  };

  handleRegister = () => {
    this.setState({
      visible: true,
      register: true,
      login: false,
    });
  };

  handleLogin = () => {
    this.setState({
      visible: true,
      register: false,
      login: true,
    });
  };

  componentWillReceiveProps(newProps) {
    if (newProps.visible !== this.state.visible) {
      this.setState({
        visible: newProps.visible,
        login: newProps.visible,
        register: false,
      });
    }
  }

  render() {
    return (
      <>
        <Modal
          visible={this.state.visible}
          title={null}
          onCancel={this.props.handleOpen.bind(this, false)}
          footer={null}
        >
          {this.state.login ? (
            <Login handleRegister={this.handleRegister} />
          ) : null}
          {this.state.register ? (
            <Register handleLogin={this.handleLogin} />
          ) : null}
        </Modal>
      </>
    );
  }
}
