import React from 'react';
import { Root } from "native-base";
import MainApp from "./src/components/App";

class App extends React.Component {

  render() {
    return (
    <Root>
    <MainApp />
  </Root>
    );
  }
};


export default App;
