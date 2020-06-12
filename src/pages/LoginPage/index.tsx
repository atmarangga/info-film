import React, { PureComponent } from "react";
import { Item, Button, Card, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import Input from "../../components/Input";
import {
  loginActions,
  clearAllData,
  removeError,
} from "../../redux/actions/generalActions";
import {
  makeSelectUsername,
  makeSelectPassword,
  makeSelectRequestProcess,
  makeSelectError,
} from "../../redux/selector";
import { checkRequest } from "../../helpers/utils";
import { LOGIN_REQUEST } from "../../helpers/request";

interface Props {
  clearData?: Function;
  requestLogin?: Function;
  username?: string | any;
  password?: string | any;
  errorLogin?: any;
  requestPool?: Array<string> | any;
  removeError?: Function;
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
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  componentDidUpdate(prevProps?: any) {
    const oldRequestPool = prevProps.requestPool;
    const newReqeustPool = this.props.requestPool;
    if (JSON.stringify(oldRequestPool) !== JSON.stringify(newReqeustPool)) {
      this.checkLoading();
    }
    const { username, password } = this.props;
    const oldUsername = prevProps.username;
    const oldPassword = prevProps.password;
    if (
      (oldUsername === null || oldUsername === undefined) &&
      username !== null &&
      username !== undefined
    ) {
      this.setFirstInput("username");
    }
    if (
      (oldPassword === null || oldPassword === undefined) &&
      password !== null &&
      password !== undefined
    ) {
      this.setFirstInput("password");
    }
  }

  handleModalClose() {
    const { removeError } = this.props;
    if (removeError) {
      removeError();
    }
  }

  handleLogin() {
    const { requestLogin, username, password } = this.props;
    if (!username) {
      this.setFirstInput("username");
    }
    if (!password) {
      this.setFirstInput("password");
    }
    if (requestLogin && username && password) {
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
    const { errorLogin } = this.props;
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
                  name="username"
                  placeholder="username"
                  isError={
                    this.checkEmpty().username && !this.state.inputUsername
                  }
                />
              </Item>
              <Item style={styles.input}>
                <Input
                  isPassword
                  name="password"
                  placeholder="password"
                  isError={
                    this.checkEmpty().password && !this.state.inputPassword
                  }
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
        {errorLogin && (
          <Modal size="mini" open={true}>
            <Modal.Header>{errorLogin && errorLogin.title}</Modal.Header>
            <Modal.Content>{errorLogin && errorLogin.message}</Modal.Content>
            <Modal.Actions>
              <Button negative onClick={this.handleModalClose}>Ok</Button>
            </Modal.Actions>
          </Modal>
        )}
      </>
    );
  }
}

function mapStateToProps(state?: any) {
  return {
    username: makeSelectUsername(state),
    password: makeSelectPassword(state),
    requestPool: makeSelectRequestProcess(state),
    errorLogin: makeSelectError(state),
  };
}

function mapDispatchToProps(dispatch?: any) {
  return {
    requestLogin: () => dispatch(loginActions()),
    clearData: () => dispatch(clearAllData()),
    removeError: () => dispatch(removeError()),
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
  titleContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignContents: "center",
  },
  title: {
    fontSize: 50,
    width: 350,
    color: "#000",
    padding: 10,
    marginBottom: 10,
  },
};
