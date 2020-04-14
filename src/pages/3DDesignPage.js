import React, { Component } from "react";
import styled from "styled-components";
//components
import CustomCard from "../component/Card";
import CustomHeader from "../component/Header";
//Ant Design
import { Input, Col, Row, Card, Typography } from "antd";
//Assets
import ExploreDonate from "../assets/explore_bg.jpg";

const { Title } = Typography;
const { Meta } = Card;

export default class SearchPage extends Component {
  state = {
    resultList: [
      {
        name: "3DPX-013429",
        description: "Stopgap Surgical Face Mask (SFM)",
        image:
          "https://3dprint.nih.gov/sites/default/files/styles/image_style_article/public/models/additional_images/pic3_0.jpg?itok=0TauLpKi",
        url:
          "https://www.facebook.com/fbcameraeffects/testit/221272905644360/YTZiZjUwMTlmNzg0NWU4NDYyNGFmZWI4OGRlYjc2Yzk=/",
      },
      {
        name: "3DPX-013456",
        description: "CVHCS Laser Cut or 3D Printable Face shield",
        image:
          "https://3dprint.nih.gov/sites/default/files/styles/image_style_article/public/models/additional_images/IMG_20200331_140301372~2.jpg?itok=C5_xxXD7",
        url:
          "https://www.facebook.com/fbcameraeffects/testit/2553327468215303/OTk3ODk0MDU1NTYxM2JiN2M4YWRhYmZiODQzYWYwMWE=/",
      },
    ],
  };

  handleDownloadModal = (url) => {
    window.open(url);
  };

  renderResultContent = () => {
    let resultList = [];
    this.state.resultList.map((eachResult) => {
      resultList.push(
        <Col
          span={8}
          style={{ marginBottom: "30px" }}
          onClick={this.handleDownloadModal.bind(this, eachResult.url)}
        >
          <CustomCard
            image={eachResult.image}
            title={eachResult.name}
            description={eachResult.description}
          />
        </Col>
      );
    });
    return resultList;
  };

  render() {
    return (
      <>
        <CustomHeader />
        <ResultContainer>
          <Title level={3} style={{ marginLeft: 60, marginBottom: 20 }}>
            3D Design
          </Title>
          <Row style={{ margin: 60, marginTop: 10 }}>
            {this.renderResultContent()}
          </Row>
        </ResultContainer>
      </>
    );
  }
}

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
