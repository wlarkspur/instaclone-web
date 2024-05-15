import { useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCompass, faUser } from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";
import { isLoggedInVar } from "../apollo";
import { Link } from "react-router-dom";
import routes from "../screens/routes";
import useUser from "../hooks/useUser";

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  max-width: 65%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;
const Icon = styled.span`
  margin-left: 15px;
`;

const Button = styled.span`
  background-color: ${(props) => props.theme.accentColor};
  border-radius: 4px;
  padding: 3px 15px;
  color: white;
  font-weight: 600;
`;

function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const loggedInUser = useUser();
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </Column>
        <Column>
          {isLoggedIn ? (
            <>
              <Icon>
                <FontAwesomeIcon icon={faHome} />
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faCompass} />
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faUser} />
              </Icon>
            </>
          ) : (
            <Link to={routes.home}>
              <Button>Login</Button>
            </Link>
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
}

export default Header;
