import React, { PureComponent } from "react";
import { Button, Card} from "semantic-ui-react";
import Input from '../../components/Input';

interface Props {}
interface state {}

class LoginPage extends PureComponent<Props, state> {
  constructor(props: Object) {
    super(props);
    this.state = {
      isFirstRunState: true,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleLogin() {
    console.log("Just Clickin");
  }

  handleClear() {
    console.log("Clear");
  }

  render() {
    return (
      <div>
        <Card>
          <Card.Header></Card.Header>
          <Card.Content>
            <Input name='username' placeholder="username" />
            <Input name='password' placeholder="password" />
            <div>
              <Button negative onClick={this.handleClear}>
                Cancel
              </Button>
              <Button positive onClick={this.handleLogin}>
                Submit
              </Button>
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default LoginPage;   


