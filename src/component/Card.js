import React, { Component } from "react";
import styled from "styled-components";
//Text
import { Typography } from "antd";

const { Title } = Typography;

class Card extends Component {
  render() {
    return (
      <Container>
        <CoverImage src={this.props.image} />
        <Title
          style={{
            marginLeft: 20,
            marginTop: 10,
            marginBottom: 0,
            color: "#333",
          }}
          level={4}
        >
          {this.props.title}
        </Title>
        <p style={{ marginLeft: 20, color: "#666" }}>
          {this.props.description}
        </p>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 95%;
  height: 350px;
  border-radius: 20px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
  cursor: pointer;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 250px;
  border-radius: 20px 20px 0px 0px;
`;

export default Card;
