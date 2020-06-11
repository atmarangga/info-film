import React, { PureComponent } from "react";
import { Button, Card } from "semantic-ui-react";
import { connect } from "react-redux";
import Input from "../../components/Input";
import { loginActions, clearAllData } from "../../redux/actions/generalActions";
import {
  makeSelectUsername,
  makeSelectPassword,
  makeSelectRequestProcess,
} from "../../redux/selector";
import { checkRequest } from "../../helpers/utils";
import {LOGIN_REQUEST} from "../../helpers/request";


interface Props {
  clearData?: Function;
  requestLogin?: Function;
  username?: string | any;
  password?: string | any;
  requestPool?: Array<string> | any;
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
    this.checkEmpty = this.checkEmpty.bind(this);
    this.checkLoading = this.checkLoading.bind(this);
  }

  componentDidUpdate(prevProps?: any){
    const oldRequestPool = prevProps.requestPool;
    const newReqeustPool = this.props.requestPool;
    if(JSON.stringify(oldRequestPool) !== JSON.stringify(newReqeustPool)){
      this.checkLoading();
    }
  }
  
  handleLogin() {
    const { requestLogin, username, password } = this.props;

    if (!this.checkEmpty() && requestLogin) {
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

  checkLoading() {
    const { requestPool } = this.props;
    this.setState({loadingButton: checkRequest(requestPool, LOGIN_REQUEST)})
  }

  checkEmpty() {
    const { username, password } = this.props;
    console.log("username ?", username);
    if (!username) {
      alert("Username required");
      return true;
    }
    if (!password) {
      alert("Password required");
      return true;
    }
    return false;
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
    username: makeSelectUsername(state),
    password: makeSelectPassword(state),
    requestPool: makeSelectRequestProcess(state),
  };
}

function mapDispatchToProps(dispatch?: any) {
  return {
    requestLogin: () => dispatch(loginActions()),
    clearData: () => dispatch(clearAllData()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
