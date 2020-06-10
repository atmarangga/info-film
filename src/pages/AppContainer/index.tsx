import React, { PureComponent } from "react";
import LoginPage from "../LoginPage";

interface Props {}

class AppContainer extends PureComponent<Props> {
  render() {
    return <LoginPage />;
  }
}



export default AppContainer;