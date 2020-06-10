import React, { PureComponent } from "react";
import { Button, Card } from "semantic-ui-react";
import { connect } from "react-redux";
import Input from "../../components/Input";
import { loginActions, clearAllData } from "../../redux/actions/generalActions";
import { makeSelectUsername, makeSelectPassword } from "../../redux/selector";

interface Props {
  clearData?: Function;
  requestLogin?: Function;
  username?: string | any;
  password?: string | any;
}
interface state {
  loadingButton: boolean;
  isFirstRunState: boolean;
}

class LoginPage extends PureComponent<Props, state> {
  constructor(props: Object) {
    super(props);
    this.state = {
      isFirstRunState: true,
      loadingButton: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleLogin() {
    console.log("Just Clickin");
    const { requestLogin, username, password } = this.props;
    if(requestLogin){
      requestLogin(username, password);
    }
  }

  handleClear() {
    console.log("Clear");
    const { clearData } = this.props;
    if (clearData) {
      clearData();
    }
  }

  render() {
    return (
      <div>
        <Card>
          <Card.Header></Card.Header>
          <Card.Content>
            <Input name="username" placeholder="username" />
            <Input isPassword name="password" placeholder="password" />
            <div>
              {/* <Button negative onClick={this.handleClear}>
                Clear
              </Button> */}
              <Button
                positive
                onClick={this.handleLogin}
                loading={this.state.loadingButton}
              >
                Login
              </Button>
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state?: any) {
  return {
    username: makeSelectUsername,
    password: makeSelectPassword,
  };
}

function mapDispatchToProps(dispatch?: any) {
  return {
    requestLogin: (username: string, password: string) =>
      dispatch(loginActions(username, password)),
    clearData: () => dispatch(clearAllData()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
