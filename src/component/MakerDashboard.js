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
  Loading,
  TextField,
  Select,
  Thumbnail,
  EmptyState,
} from "@shopify/polaris";
import { AppProvider } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import {
  LogOutMinor,
  InviteMinor,
  CustomersMinor,
  CashDollarMajorMonotone,
} from "@shopify/polaris-icons";
import "@shopify/polaris/styles.css";
import ExploreDonate from "../assets/explore_bg.jpg";
import logo from "./../assets/Logo/logo.svg";

const img = "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";
class MakerDashboard extends Component {
  state = {
    name: "",
    state: "",
    quantity: 0,
    facility: "",
    address: "",
    phone: "",
    amount: 0,
    request: null,
    product: "",
    image: "",
    loading: false,
    selectedRequest: false,
    addFund: false,
    selectedFund: false,
  };

  handleSelectChange = (value) => {
    this.setState({
      request: value,
    });
  };

  handleChange = (value, id) => {
    this.setState({
      [id]: value,
    });
  };

  handleAddFund = (bool) => {
    this.setState({
      addFund: bool,
      amount: 0,
      request: "",
      product: "",
      loading: false,
      image: "",
    });

    if (!bool)
      this.setState({
        selectedFund: false,
      });
  };

  handleSelectFund = (item) => {
    this.setState({
      id: item.id,
      amount: item.amount,
      request: item.request,
      product: item.product,
      image: item.image,
      selectedFund: true,
      addFund: true,
    });
  };

  handleDelete = () => {
    if (!this.state.loading)
      this.setState(
        {
          loading: true,
        },
        () => {
          this.props.deleteFund(this.state.id);
          setTimeout(() => {
            this.setState({
              loading: false,
              addFund: false,
              id: "",
              amount: 0,
              product: "",
              image: "",
              request: "",
            });
          }, 1000);
        }
      );
  };

  handleSelectRequest = (item) => {
    if (item)
      this.setState({
        id: item.id,
        name: item.name,
        state: item.state,
        quantity: item.quantity,
        facility: item.facility,
        address: item.address,
        phone: item.phone,
        selectedRequest: true,
      });
    else
      this.setState({
        selectedRequest: false,
      });
  };

  handleSubmit = () => {
    if (!this.state.loading)
      this.setState(
        {
          loading: true,
        },
        () => {
          this.props.createFund({
            request: this.state.request,
            amount: this.state.amount,
            product: this.state.product,
            image: this.state.image,
          });
          setTimeout(() => {
            this.setState({
              loading: false,
              addFund: false,
              request: "",
              amount: 0,
              product: "",
              image: "",
            });
          }, 1000);
        }
      );
  };

  renderRequests = () => {
    if (this.props.requests && this.props.requests.length > 0) {
      if (this.state.selectedRequest)
        return (
          <Layout>
            <Layout.Section>
              <ShopifyButton
                plain
                onClick={this.handleSelectRequest.bind(this, null)}
              >
                {"< Back"}
              </ShopifyButton>
              <DisplayText size="large">Request List</DisplayText>
            </Layout.Section>
            <Layout.Section>
              <Card>
                <Card.Section>
                  <ShopifyForm>
                    <FormLayout>
                      <TextField
                        value={this.state.name}
                        label="Name"
                        type="text"
                        id="name"
                      />
                      <TextField
                        value={this.state.state}
                        label="State"
                        type="text"
                        id="state"
                      />
                      <TextField
                        value={this.state.quantity}
                        label="Quantity"
                        type="number"
                        id="quantity"
                      />
                      <TextField
                        value={this.state.facility}
                        label="Facility"
                        type="text"
                        id="facility"
                      />
                      <TextField
                        value={this.state.address}
                        label="Address"
                        type="text"
                        id="address"
                      />
                      <TextField
                        value={this.state.phone}
                        label="Phone"
                        type="tel"
                        id="phone"
                      />
                    </FormLayout>
                  </ShopifyForm>
                </Card.Section>
              </Card>
            </Layout.Section>
          </Layout>
        );
      else
        return (
          <Layout>
            <Layout.Section>
              <DisplayText size="large">Request List</DisplayText>
            </Layout.Section>
            <Layout.Section>
              <Card>
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
              </Card>
            </Layout.Section>
          </Layout>
        );
    } else {
      return (
        <Layout>
          <Layout.Section>
            <DisplayText size="large">Request List</DisplayText>
          </Layout.Section>
          <Layout.Section>
            <EmptyState heading="Empty List" image={img}>
              <p>Frontliners have not created any request yet</p>
            </EmptyState>
          </Layout.Section>
        </Layout>
      );
    }
  };

  renderFunds = () => {
    let options = [];
    if (this.props.requests && this.props.requests.length > 0)
      this.props.requests.map((eachRequest) => {
        options.push({
          label: eachRequest.facility,
          value: eachRequest.id,
        });
      });
    return (
      <Layout>
        <Layout.Section>
          {this.state.addFund ? (
            <>
              <ShopifyButton
                plain
                onClick={this.handleAddFund.bind(this, false)}
              >
                {"< Back"}
              </ShopifyButton>
              <DisplayText size="large">
                {this.state.selectedFund ? "View Funds" : "Raise Funds"}
              </DisplayText>
            </>
          ) : (
            <Stack>
              <Stack.Item fill>
                <DisplayText size="large">Funds List</DisplayText>
              </Stack.Item>

              <ShopifyButton
                primary
                onClick={this.handleAddFund.bind(this, true)}
              >
                Raise Funds
              </ShopifyButton>
            </Stack>
          )}
        </Layout.Section>
        <Layout.Section>
          <Card>
            {this.state.addFund ? (
              <Card.Section>
                <ShopifyForm>
                  <FormLayout>
                    <Select
                      label="Fund Purpose"
                      options={options}
                      value={this.state.request}
                      onChange={this.handleSelectChange}
                    />
                    <TextField
                      value={this.state.amount}
                      label="Amount(RM)"
                      type="number"
                      id="amount"
                      onChange={this.handleChange}
                    />
                    <TextField
                      value={this.state.product}
                      label="Description (State how you are utilising the fund raised)"
                      type="text"
                      id="product"
                      onChange={this.handleChange}
                    />
                    <TextField
                      value={this.state.image}
                      label="Preview Image"
                      type="url"
                      id="image"
                      onChange={this.handleChange}
                    />

                    {this.state.selectedFund ? (
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
                resourceName={{ singular: "funds", plural: "funds" }}
                items={this.props.funds ? this.props.funds : []}
                renderItem={(item) => {
                  const { id, amount, image, product } = item;
                  const media = (
                    <Thumbnail
                      size="medium"
                      source={item.image ? item.image : ExploreDonate}
                    />
                  );
                  return (
                    <ResourceItem
                      id={id}
                      media={media}
                      onClick={this.handleSelectFund.bind(this, item)}
                    >
                      <TextStyle variation="strong">{product}</TextStyle>
                      <div>RM{amount} to be raised</div>
                    </ResourceItem>
                  );
                }}
              />
            )}
          </Card>
        </Layout.Section>
      </Layout>
    );
  };

  renderContent = () => {
    if (this.props.menu === "donation") return <>{this.renderFunds()}</>;
    else if (this.props.menu === "profile")
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
    else return <>{this.renderRequests()}</>;
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
              label: "Donation",
              icon: CashDollarMajorMonotone,
              onClick: this.props.handleNavigation.bind(this, "donation"),
            },
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
              onClick: this.props.handleSignOut,
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

export default MakerDashboard;
