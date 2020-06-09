import React from "react";
import SuggestionsTextInput from "./components/Search";
import { Grommet, Box } from "grommet";
import theme from "./styles/styles";
const AppBar = (props) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    style={{ zIndex: "1" }}
    {...props}
  />
);
function App() {
  return (
    <Grommet theme={theme}>
      <AppBar>Movie Search App</AppBar>
      <SuggestionsTextInput />
    </Grommet>
  );
}

export default App;
