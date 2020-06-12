import React, { PureComponent } from "react";
import { Item, Button, Card } from "semantic-ui-react";
import { connect } from "react-redux";
import Input from "../../components/Input";
import { loginActions, clearAllData } from "../../redux/actions/generalActions";
import {
  makeSelectUsername,
  makeSelectPassword,
  makeSelectRequestProcess,
} from "../../redux/selector";
import { checkRequest } from "../../helpers/utils";
import { LOGIN_REQUEST } from "../../helpers/request";

interface Props {
  clearData?: Function;
  requestLogin?: Function;
  username?: string | any;
  password?: string | any;
  requestPool?: Array<string> | any;
}
interface state {
  loadingButton: boolean;
  inputPassword: boolean;
  inputUsername: boolean;
}

class LoginPage extends PureComponent<Props, state> {
  constructor(props: Object) {
    super(props);
    this.state = {
      loadingButton: false,
      inputPassword: true,
      inputUsername: true,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.checkEmpty = this.checkEmpty.bind(this);
    this.checkLoading = this.checkLoading.bind(this);
    this.setFirstInput = this.setFirstInput.bind(this);
  }

  componentDidUpdate(prevProps?: any) {
    const oldRequestPool = prevProps.requestPool;
    const newReqeustPool = this.props.requestPool;
    if (JSON.stringify(oldRequestPool) !== JSON.stringify(newReqeustPool)) {
      this.checkLoading();
    }
  }

  handleLogin() {
    const { requestLogin, username, password } = this.props;

    if (requestLogin) {
      requestLogin(username, password);
    }
  }

  setFirstInput(name?: string) {
    if (name === "password" && this.state.inputPassword) {
      this.setState({
        inputPassword: false,
      });
    }
    if (name === "username" && this.state.inputUsername) {
      this.setState({
        inputUsername: false,
      });
    }
  }

  checkLoading() {
    const { requestPool } = this.props;
    this.setState({ loadingButton: checkRequest(requestPool, LOGIN_REQUEST) });
  }

  checkEmpty() {
    const { username, password } = this.props;
    const returnObject = {
      username: false,
      password: false,
    };
    if (!username) {
      returnObject.username = true;
    }
    if (!password) {
      returnObject.password = true;
    }
    return returnObject;
  }

  render() {
    return (
      <>
        <div style={styles.header}></div>
        <div style={styles.titleContainer}>
          <div style={styles.title}>Info Film</div>
        </div>
        <div style={styles.page}>
          <Card style={styles.card}>
            <Card.Content>
              <Item style={styles.input}>
                <Input
                  notFirstInput={() => this.setFirstInput("username")}
                  isFirst={this.state.inputUsername}
                  // isFirst={false}
                  name="username"
                  placeholder="username"
                  isError={this.checkEmpty().username}
                />
              </Item>
              <Item style={styles.input}>
                <Input
                  notFirstInput={() => this.setFirstInput("password")}
                  isFirst={this.state.inputPassword}
                  isPassword
                  name="password"
                  placeholder="password"
                  isError={this.checkEmpty().password}
                />
              </Item>
              <Item>
                <div>
                  <Button
                    style={styles.buttons}
                    primary
                    onClick={this.handleLogin}
                    loading={this.state.loadingButton}
                    disabled={this.state.loadingButton}
                  >
                    Login
                  </Button>
                </div>
              </Item>
            </Card.Content>
          </Card>
        </div>
      </>
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

const styles = {
  header: {
    height: 200,

    justifyContent: "center",
  },
  page: {
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignContents: "center",
    backgroundColor: "#fafafa",
    flex: 1,
  },
  card: {
    justifyContent: "center",
    width: 350,
  },
  buttons: {
    width: "100%",
  },
  input: {
    width: "100%",
    marginBottom: 5,
  },
  titleContainer:{
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignContents: "center"
  },
  title: {
    fontSize: 50,
    width: 350,
    color: "#000",
    padding: 10,
    marginBottom: 10,
    
  },
};
