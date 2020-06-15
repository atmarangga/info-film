import React, { PureComponent } from "react";
import { connect } from "react-redux";
import LoginPage from "../LoginPage";
import HomePage from "../HomePage";
import { makeSelectToken } from "../../redux/selector";

interface Props {
  token?: string;
}
interface State {
  currentPage?: any;
}
class AppContainer extends PureComponent<Props, State> {
  constructor(props?: any) {
    super(props);
    this.state = {
      currentPage: <LoginPage />,
    };
    this.checkLoginSession = this.checkLoginSession.bind(this);
  }
  checkLoginSession(){
    const { token } = this.props;
    if(token && token !== ''){
      this.setState({
        currentPage: <HomePage />
      });
    }
  }

  render() {
    // const { currentPage } = this.state;
    //return currentPage;
    const {token} = this.props;
    return token && token !== '' && token !== null && token !== undefined ? <HomePage /> : <LoginPage />
  }
}

function mapStateToProps(state?: any) {
  return {
    token: makeSelectToken(state)
  };
}

function mapDispatchToProps(dispatch?: any) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
