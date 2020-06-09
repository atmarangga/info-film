import React, { PureComponent } from "react";
import { Button, Card, Input, Label } from "semantic-ui-react";

interface Props {}
interface state {}

export default class LoginPage extends PureComponent<Props, state> {
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
            <Input placeholder="username"></Input>
            <Input placeholder="password"></Input>
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
