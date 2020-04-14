import React, { Component } from "react";
//Shopify
import {
  Navigation,
  Page,
  Frame,
  TopBar,
  Layout,
  Card,
  ResourceItem,
  ResourceList,
  Avatar,
  TextStyle,
  Button as ShopifyButton,
  DisplayText,
  Stack,
  Form as ShopifyForm,
  FormLayout,
  TextField,
  Loading,
} from "@shopify/polaris";
import { AppProvider } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import {
  LogOutMinor,
  InviteMinor,
  CustomersMinor,
} from "@shopify/polaris-icons";
import "@shopify/polaris/styles.css";
import logo from "./../assets/Logo/logo.svg";

class FrontlineDashboard extends Component {
  state = {
    addRequest: false,
    selectedRequest: false,
    name: "",
    state: "",
    quantity: 0,
    facility: "",
    address: "",
    phone: "",
    id: "",
    loading: false,
  };

  handleSelectRequest = (item) => {
    this.setState({
      id: item.id,
      name: item.name,
      state: item.state,
      quantity: item.quantity,
      facility: item.facility,
      address: item.address,
      phone: item.phone,
      selectedRequest: true,
      addRequest: true,
    });
  };

  handleAddRequest = (bool) => {
    this.setState({
      addRequest: bool,
      id: "",
      name: "",
      state: "",
      quantity: 0,
      facility: "",
      address: "",
      phone: "",
      loading: false,
    });

    if (!bool)
      this.setState({
        selectedRequest: false,
      });
  };

  handleChange = (value, id) => {
    this.setState({
      [id]: value,
    });
  };

  handleDelete = () => {
    if (!this.state.loading)
      this.setState(
        {
          loading: true,
        },
        () => {
          this.props.deleteRequest(this.state.id);
          setTimeout(() => {
            this.setState({
              loading: false,
              addRequest: false,
              name: "",
              state: "",
              quantity: 0,
              facility: "",
              address: "",
              phone: "",
            });
          }, 1000);
        }
      );
  };

  handleSubmit = () => {
    if (!this.state.loading)
      this.setState(
        {
          loading: true,
        },
        () => {
          this.props.createRequest(this.state);
          setTimeout(() => {
            this.setState({
              loading: false,
              addRequest: false,
              name: "",
              state: "",
              quantity: 0,
              facility: "",
              address: "",
              phone: "",
            });
          }, 1000);
        }
      );
  };

  renderContent = () => {
    if (this.props.menu === "request")
      return (
        <Layout>
          <Layout.Section>
            {this.state.addRequest ? (
              <>
                <ShopifyButton
                  plain
                  onClick={this.handleAddRequest.bind(this, false)}
                >
                  {"< Back"}
                </ShopifyButton>
                <DisplayText size="large">
                  {this.state.selectedRequest ? "View Request" : "Add Request"}
                </DisplayText>
              </>
            ) : (
              <Stack>
                <Stack.Item fill>
                  <DisplayText size="large">Request List</DisplayText>
                </Stack.Item>

                <ShopifyButton
                  primary
                  onClick={this.handleAddRequest.bind(this, true)}
                >
                  Add Request
                </ShopifyButton>
              </Stack>
            )}
          </Layout.Section>
          <Layout.Section>
            <Card>
              {this.state.addRequest ? (
                <Card.Section>
                  <ShopifyForm>
                    <FormLayout>
                      <TextField
                        value={this.state.name}
                        label="Name"
                        type="text"
                        id="name"
                        onChange={this.handleChange}
                      />
                      <TextField
                        value={this.state.state}
                        label="State"
                        type="text"
                        id="state"
                        onChange={this.handleChange}
                      />
                      <TextField
                        value={this.state.quantity}
                        label="Quantity"
                        type="number"
                        id="quantity"
                        onChange={this.handleChange}
                      />
                      <TextField
                        value={this.state.facility}
                        label="Facility"
                        type="text"
                        id="facility"
                        onChange={this.handleChange}
                      />
                      <TextField
                        value={this.state.address}
                        label="Address"
                        type="text"
                        id="address"
                        onChange={this.handleChange}
                      />
                      <TextField
                        value={this.state.phone}
                        label="Phone"
                        type="tel"
                        id="phone"
                        onChange={this.handleChange}
                      />

                      {this.state.selectedRequest ? (
                        <ShopifyButton destructive onClick={this.handleDelete}>
                          Delete
                        </ShopifyButton>
                      ) : (
                        <ShopifyButton primary onClick={this.handleSubmit}>
                          Submit
                        </ShopifyButton>
                      )}
                    </FormLayout>
                  </ShopifyForm>
                </Card.Section>
              ) : (
                <ResourceList
                  resourceName={{ singular: "request", plural: "requests" }}
                  items={this.props.requests ? this.props.requests : []}
                  renderItem={(item) => {
                    const { id, facility, quantity, name } = item;
                    const media = <Avatar customer size="medium" name={name} />;
                    return (
                      <ResourceItem
                        id={id}
                        media={media}
                        onClick={this.handleSelectRequest.bind(this, item)}
                      >
                        <TextStyle variation="strong">{facility}</TextStyle>
                        <div>{quantity} face masks needed</div>
                      </ResourceItem>
                    );
                  }}
                />
              )}
            </Card>
          </Layout.Section>
        </Layout>
      );
    else
      return (
        <Layout>
          <Layout.Section>
            <Card title="Profile" sectioned>
              <ShopifyForm>
                <FormLayout>
                  <TextField
                    value={this.props.user ? this.props.user.name : "Name"}
                    label="Name"
                    type="text"
                  />
                  <TextField
                    value={this.props.user ? this.props.user.email : "Email"}
                    label="Email"
                    type="email"
                  />
                </FormLayout>
              </ShopifyForm>
            </Card>
          </Layout.Section>
        </Layout>
      );
  };

  render() {
    const theme = {
      colors: {
        topBar: {
          background: "#3949B8",
        },
      },
      logo: {
        width: 124,
        topBarSource: logo,
        url: "/",
      },
    };

    const navigationMarkup = (
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              label: "Request List",
              icon: InviteMinor,
              onClick: this.props.handleNavigation.bind(this, "request"),
            },
            {
              label: "Profile",
              icon: CustomersMinor,
              onClick: this.props.handleNavigation.bind(this, "profile"),
            },
            {
              label: "Log Out",
              icon: LogOutMinor,
              onClick: this.props.signOut,
            },
          ]}
        />
      </Navigation>
    );
    const topBarMarkup = <TopBar showNavigationToggle />;
    return (
      <AppProvider i18n={translations} theme={theme}>
        <Frame navigation={navigationMarkup} topBar={topBarMarkup}>
          <Page>
            <>
              {this.state.loading && <Loading />}
              {this.renderContent()}
            </>
          </Page>
        </Frame>
      </AppProvider>
    );
  }
}

export default FrontlineDashboard;
