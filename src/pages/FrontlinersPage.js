import React, { Component } from "react";
import styled from "styled-components";
//Components
import Header from "../component/Header";
//Ant Design
import { Input, Typography, Button, Form, Spin } from "antd";
//Assets
import LogoLarge from "../assets/Logo/logoLarge.png";
import backgroundMaker from "../assets/maker_bg.jpg";
//Redux Firebase
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//Actions
import {
  createFrontliner,
  signOut,
  signIn,
} from "../store/actions/authActions";
import { createRequest, deleteRequest } from "../store/actions/requestActions";
//Utils
import EventBus from "js-event-bus";
//Components
import FrontLineDashboard from "../component/FrontlineDashboard";

const eventBus = EventBus();
const { Title } = Typography;

class FrontlinerPage extends Component {
  state = {
    create: false,
    name: "",
    nameError: "",
    password: "",
    passwordError: "",
    email: "",
    emailError: "",
    loading: false,
    menu: "request",
  };

  componentDidMount() {
    eventBus.on("create-success", this.handleSuccess);
    eventBus.on("create-error", this.handleError);
  }

  handleNavigation = (to) => {
    this.setState({
      menu: to,
    });
  };

  handleSuccess = () => {
    this.setState({
      loading: false,
    });
  };

  handleError = (err) => {
    if (err.message.includes("email address"))
      this.setState({
        emailError: "Email address has been registered",
        loading: false,
      });
    else
      this.setState({
        passwordError: err.message,
        loading: false,
      });
  };

  componentWillUnmount() {
    eventBus.detach("create-success");
    eventBus.detach("create-error");
    this.setState({
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      name: "",
      nameError: "",
    });
  }

  handleCreate = (bool) => {
    this.setState({
      create: bool,
      name: "",
      nameError: "",
      password: "",
      passwordError: "",
      email: "",
      emailError: "",
    });
  };

  handleChange = (event) => {
    let eventId = event.target.id;

    this.setState({
      [eventId]: event.target.value,
    });
  };

  handleSignOut = () => {
    this.props.signOut();
  };

  handleSignUp = () => {
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (this.state.name.replace(" ", "") < 1)
      this.setState({
        nameError: "Please enter your name",
      });
    else if (!filter.test(this.state.email))
      this.setState({
        nameError: "",
        emailError: "Please enter the correct email format",
      });
    else if (this.state.password.replace(" ", "") < 1)
      this.setState({
        nameError: "",
        emailError: "",
        passwordError: "Please enter your password",
      });
    else
      this.setState(
        {
          nameError: "",
          emailError: "",
          passwordError: "",
          loading: true,
        },
        () => {
          this.props.createFrontliner({
            name: this.state.name,
            password: this.state.password,
            email: this.state.email,
          });
        }
      );
  };

  handleSignIn = () => {
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(this.state.email))
      this.setState({
        nameError: "",
        emailError: "Please enter the correct email format",
      });
    else if (this.state.password.replace(" ", "") < 1)
      this.setState({
        emailError: "",
        passwordError: "Please enter your password",
      });
    else
      this.setState(
        {
          emailError: "",
          passwordError: "",
          loading: true,
        },
        () => {
          this.props.signIn({
            password: this.state.password,
            email: this.state.email,
          });
        }
      );
  };

  renderAuth = () => {
    return (
      <>
        <LogoContainer>
          <img style={{ height: 40, width: 40 }} src={LogoLarge} />
          <Title style={{ marginBottom: 0, marginLeft: 10 }} level={3}>
            Frontliner Dashboard
          </Title>
        </LogoContainer>

        {this.state.create && (
          <InputContainer
            validateStatus={this.state.nameError ? "error" : "success"}
            help={this.state.nameError ? this.state.nameError : null}
          >
            <CustomInput
              value={this.state.name}
              id="name"
              onChange={this.handleChange}
              placeholder="Name"
            />
          </InputContainer>
        )}
        <InputContainer
          validateStatus={this.state.emailError ? "error" : "success"}
          help={this.state.emailError ? this.state.emailError : null}
        >
          <CustomInput
            value={this.state.email}
            id="email"
            onChange={this.handleChange}
            placeholder="Email"
          />
        </InputContainer>
        <InputContainer
          style={{ margin: 0 }}
          validateStatus={this.state.passwordError ? "error" : "success"}
          help={this.state.passwordError ? this.state.passwordError : null}
        >
          <CustomPassword
            value={this.state.password}
            id="password"
            onChange={this.handleChange}
            placeholder="Password"
          />
        </InputContainer>

        <CustomButton
          onClick={this.state.create ? this.handleSignUp : this.handleSignIn}
        >
          {this.state.create ? "Sign Up" : "Sign In"}
        </CustomButton>
        <ButtonLink
          onClick={this.handleCreate.bind(
            this,
            this.state.create ? false : true
          )}
        >
          {this.state.create ? "Have an account?" : "Don't have an account?"}
        </ButtonLink>
      </>
    );
  };

  render() {
    if (
      this.props.user &&
      this.props.user[0].type === "frontliners" &&
      this.props.firebase.auth().currentUser
    )
      return (
        <FrontLineDashboard
          handleNavigation={this.handleNavigation}
          createRequest={this.props.createRequest}
          deleteRequest={this.props.deleteRequest}
          signOut={this.props.signOut}
          requests={this.props.requests}
          user={this.props.user ? this.props.user[0] : null}
          menu={this.state.menu}
          handleSignOut={this.handleSignOut}
        />
      );
    else {
      return (
        <>
          <Header />
          <Container style={{ backgroundImage: `url(${backgroundMaker})` }}>
            <CardContainer>
              {this.state.loading ? (
                <Spin
                  style={{ height: 250, display: "flex", alignItems: "center" }}
                  size="large"
                />
              ) : (
                this.renderAuth()
              )}
            </CardContainer>
          </Container>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    firebase: state.firebase,
    user: state.firestore.ordered.user,
    requests: state.firestore.ordered.requests,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createRequest: (credentials) => dispatch(createRequest(credentials)),
    deleteRequest: (id) => dispatch(deleteRequest(id)),
    createFrontliner: (credentials) => dispatch(createFrontliner(credentials)),
    signOut: () => dispatch(signOut()),
    signIn: (credentials) => dispatch(signIn(credentials)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    let firestoreList = [];

    if (props.firebase.auth().currentUser) {
      firestoreList.push({
        collection: "users",
        where: ["id", "==", props.firebase.auth().currentUser.uid],
        storeAs: "user",
      });
      firestoreList.push({
        collection: "requests",
        where: ["userId", "==", props.firebase.auth().currentUser.uid],
      });
    }

    return firestoreList;
  })
)(FrontlinerPage);

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const CardContainer = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  padding: 30px 0px;
  border-radius: 20px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
`;

const Container = styled(Form)`
  height: 100vh;
  width: 100vw;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-size: cover;
  background-repeat: no-repeat;
`;

const CustomPassword = styled(Input.Password)`
  width: 350px;
  height: 50px;
  border-radius: 10px !important;
  margin: 10px;
  font-size: 16px;
`;

const CustomInput = styled(Input)`
  width: 350px;
  height: 50px;
  border-radius: 10px !important;
  margin: 10px;
  font-size: 16px;
`;

const InputContainer = styled(Form.Item)`
  margin-bottom: 0px;
`;

const CustomButton = styled(Button)`
  width: 350px;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  margin-top: 20px;
  background: #6979f8 !important;
  border: none;
  color: white !important;
  font-weight: 600;

  &:hover {
    background: #8999f8 !important;
    color: white !important;
  }
`;

const ButtonLink = styled.p`
  color: #6979f8;
  margin-top: 30px;
  cursor: pointer;
  text-align: left;
  font-weight: bold;

  &:hover {
    color: #8999f8;
  }
`;
