import { gql } from "@apollo/client";
import { styled } from "styled-components";

interface SAvatarProps {
  $lg: boolean;
}

const SAvatar = styled.div<SAvatarProps>`
  width: ${(props) => (props.$lg ? "30px" : "25px")};
  height: ${(props) => (props.$lg ? "30px" : "25px")};
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

interface IAvatar {
  url?: string;
  lg?: boolean;
}

function Avatar({ url = "", lg = false }: IAvatar) {
  return <SAvatar $lg={lg}>{url !== "" ? <Img src={url} /> : null}</SAvatar>;
}

export default Avatar;
