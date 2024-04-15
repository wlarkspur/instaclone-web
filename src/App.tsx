import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { useReactiveVar } from "@apollo/client";
import { darkModeVar, isLoggedInVar } from "./apollo";
import { ThemeProvider, styled } from "styled-components";
import { GlobalStyles, darkTheme, lightTheme } from "./styles";

interface IContainerProps {
  floating: boolean;
}

const Container = styled.div<IContainerProps>`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.fontColor};
  box-shadow: ${(props) => (props.floating ? "" : "")};
`;

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <Home /> : <Login />}
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
