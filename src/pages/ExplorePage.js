import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
//Assets
import backgroundExplore from "../assets/explore_bg.jpg";
import ExploreDonate from "../assets/explore_donate.jpg";
import ExploreCreate from "../assets/explore_create.jpg";
//Layout
import {
  ButtonText,
  Heading2,
  Caption,
  SelectBar,
  CoMakeButton,
  Banner,
} from "../component/Layout.js";
import CustomCard from "../component/Card";
import Header from "../component/Header";
//Ant Design
import { Card, Select, Row, Col, Menu, Typography, Input } from "antd";

const { Option } = Select;
const { Title } = Typography;

export default class ExplorePage extends Component {
  render() {
    return (
      <>
        <Header />
        <TabContainer>
          <Title level={2}>
            Help the makers by donating money to combat coronavirus
          </Title>
          <br />
          <InputSubtitle style={{ marginBottom: 5 }}>
            Where To Donate
          </InputSubtitle>
          <SelectBar size="large" style={{ marginBottom: 30 }}>
            <Option value="kualaLumpur">Kuala Lumpur</Option>
            <Option value="sabah">Sabah</Option>
            <Option value="selangor">Selangor</Option>
            <Option value="sarawak">Sarawak</Option>
            <Option value="johor">Johor</Option>
            <Option value="perak">Perak</Option>
            <Option value="kedah">Kedah</Option>
            <Option value="kelantan">Kelantan</Option>
            <Option value="negeriSembilan">Negeri Sembilan</Option>
            <Option value="pahang">Pahang</Option>
            <Option value="terengganu">Terengganu</Option>
            <Option value="perlis">Perlis</Option>
            <Option value="penang">Penang</Option>
            <Option value="malacca">Malacca</Option>
          </SelectBar>
          <InputSubtitle style={{ marginBottom: 5 }}>
            Amount To Donate (RM)
          </InputSubtitle>
          <TabInput />
          <ButtonContainer>
            <Link to="/search">
              <ButtonSearch type="primary">
                <ButtonText>Search</ButtonText>
              </ButtonSearch>
            </Link>
          </ButtonContainer>
        </TabContainer>
        <Banner style={{ backgroundImage: `url(${backgroundExplore})` }} />
        <ExploreContainer>
          <ExploreTitle>Explore</ExploreTitle>
          <Row style={{ margin: 60, marginTop: 10 }}>
            <Col span={8}>
              <Link to="/search">
                <CustomCard
                  image={ExploreDonate}
                  title="Donate"
                  description="Donate fund for materials required for makers to print items required to combat COVID 19"
                />
              </Link>
            </Col>
            <Col span={8}>
              <Link to="/design">
                <CustomCard
                  image={ExploreCreate}
                  title="3D Design"
                  description="Share open source designs to combat COVID for the benefit of community"
                />
              </Link>
            </Col>
          </Row>
        </ExploreContainer>
      </>
    );
  }
}

const TabContainer = styled(Card)`
  width: 550px;
  height: auto;
  margin-left: 60px;
  margin-top: 100px;
  position: absolute;
  background-color: white;
  border-radius: 10px;
  border: none !important;
`;

const InputSubtitle = styled(Caption)`
  font-weight: bold;
`;

const ButtonSearch = styled(CoMakeButton)`
  background-color: #6979f8;
  margin-top: 100px;
  border: none;

  :hover {
    background-color: #a5affb;
  }

  :focus {
    background-color: #a5affb;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 2%;
`;

const ExploreContainer = styled.div`
  width: 100%;
  height: auto;
  margin-top: 60px;
  margin-bottom: 80px;
`;

const ExploreTitle = styled(Heading2)`
  margin-bottom: 25px;
  margin-left: 60px;
`;

const TabInput = styled(Input)`
  width: 98%;
  height: 44px;
  margin-bottom: 30px;
  border-radius: 10px;
`;

const TopNav = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0px;
  padding-top: 15px;
  padding-bottom: 15px;
  left: 0px;
  width: 100vw;
  align-items: center;
`;

const LogoContainer = styled(Link)`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 60px;
`;
