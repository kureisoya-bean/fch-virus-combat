import styled from "styled-components";
import { Select, Button, Input, Typography } from "antd";

const { Title } = Typography;

export const Heading1 = styled.h1`
  font-weight: bold;
  font-size: 38px;
  line-height: 41px;
`;

export const Heading2 = styled.h2`
  font-weight: bold;
  line-height: 32px;
  font-size: 30px;
`;

export const Heading3 = styled.h3`
  font-weight: bold;
  line-height: 28px;
  font-size: 24px;
`;

export const Heading4 = styled.h4`
  font-weight: bold;
  line-height: 22px;
  font-size: 20px;
`;

export const ButtonText = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

export const Caption = styled.p`
  font-size: 14px;
  line-height: 16px;
`;

export const Body = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
`;

export const SelectBar = styled(Select)`
  width: 98%;
`;

export const CoMakeButton = styled(Button)`
  width: 120px;
  height: 44px;
  border: none;
  border-radius: 10px;
`;

export const CoMakeCardImg = styled.img`
  border-radius: 10px 10px 0px 0px !important;
`;

export const Banner = styled.div`
  width: 100%;
  height: 716px;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 20px;
  left: 0;
  width: 100vw;
  align-items: center;
`;

export const NavContainer = styled.div`
  right: 10px;
  height: 40px;
  position: absolute;
  top: 10px;
  z-index: 6;
  display: flex;
  align-items: center;
`;

export const NavLogo = styled.img`
  margin-left: 70px;
  margin-top: 3px;
`;

export const CoMakeTitle = styled(Title)`
  color: #6979f8 !important;
  font-weight: 600;
  margin-left: 5px;
  margin-bottom: 0px !important;
`;

export const ModalLogo = styled.img`
  display: flex;
  width: 100px;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
`;

export const FormInput = styled(Input)`
  width: 80%;
  height: 44px;
  border-radius: 10px;
`;

export const FormInputPassword = styled(Input.Password)`
  width: 80%;
  height: 44px;
  border-radius: 10px;
`;

export const LoginButton = styled(CoMakeButton)`
  width: 80%;
  height: 48px;
  margin-left: 50px;
  margin-top: 5px;
  background-color: #6979f8;

  :hover {
    background-color: #a5affb;
  }

  :focus {
    background-color: #a5affb;
  }
`;
