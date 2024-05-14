import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { BaseBox } from "../shared";
const SBottomBox = styled(BaseBox)`
  padding: 20px 40px;
  text-align: center;
  a {
    font-weight: 600;
    margin-left: 5px;
    color: #385285;
    text-decoration: none;
    &:visited {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

function BottomBox({ cta, link, linkText }: any) {
  return (
    <SBottomBox>
      <span>{cta}</span>
      <Link to={link}>{linkText}</Link>
    </SBottomBox>
  );
}

export default BottomBox;
