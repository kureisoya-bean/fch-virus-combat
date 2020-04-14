import React, { Component } from "react";
import styled from "styled-components";
//components
import CustomCard from "../component/Card";
import CustomHeader from "../component/Header";
//Ant Design
import { Input, Col, Row, Card, Typography, Modal } from "antd";
//Assets
import ExploreDonate from "../assets/explore_bg.jpg";
//Redux Firebase
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const { Title } = Typography;
const { Meta } = Card;

class SearchPage extends Component {
  state = {
    visible: false,
    selectedItem: null,
  };

  handleModal = (bool, fund, request) => {
    this.setState({
      visible: bool,
    });

    if (fund && request)
      this.setState({
        selectedItem: {
          title: request.facility,
          name: fund.name,
          amount: fund.amount,
          product: fund.product,
          contact: request.name,
          phone: request.phone,
        },
      });
    else
      this.setState({
        selectedItem: null,
      });
  };

  renderResultContent = () => {
    let resultList = [];
    if (this.props.funds)
      this.props.funds.map((eachFund) => {
        let selectedRequest;
        if (this.props.requests)
          this.props.requests.map((eachRequest) => {
            if (eachRequest.id === eachFund.request)
              selectedRequest = eachRequest;
          });
        resultList.push(
          <Col
            span={8}
            style={{ marginBottom: "30px" }}
            onClick={this.handleModal.bind(
              this,
              true,
              eachFund,
              selectedRequest
            )}
          >
            <CustomCard
              image={eachFund.image ? eachFund.image : ExploreDonate}
              title={
                selectedRequest
                  ? selectedRequest.facility + ` - (RM${eachFund.amount})`
                  : "Title"
              }
              description={eachFund.product}
            />
          </Col>
        );
      });
    return resultList;
  };

  render() {
    return (
      <>
        {this.state.visible && (
          <Modal
            title={
              this.state.selectedItem ? this.state.selectedItem.title : "Title"
            }
            visible={this.state.visible}
            onCancel={this.handleModal.bind(this, false)}
            footer={[]}
          >
            <p>Facility : {this.state.selectedItem.title}</p>
            <p>Amount Needed : RM{this.state.selectedItem.amount}</p>
            <p>Why fund is required : {this.state.selectedItem.product}</p>
            <p>Contact Person : {this.state.selectedItem.contact}</p>
            <p>Contact Number : {this.state.selectedItem.phone}</p>
          </Modal>
        )}
        <CustomHeader />
        <ResultContainer>
          <Title level={3} style={{ marginLeft: 60, marginBottom: 20 }}>
            Search Result
          </Title>
          <Row style={{ margin: 60, marginTop: 10 }}>
            {this.renderResultContent()}
          </Row>
        </ResultContainer>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    requests: state.firestore.ordered.requests,
    funds: state.firestore.ordered.funds,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "funds" }, { collection: "requests" }])
)(SearchPage);

const SearchInput = styled(Input.Search)`
  width: 300px !important;
  height: 44px;
  margin-top: 5px;
`;
const ResultContainer = styled.div`
  width: 100%;
  height: auto;
  margin-top: 100px;
  margin-bottom: 10px;
`;
