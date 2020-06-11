import React, { PureComponent } from "react";
import { Header, Button } from "semantic-ui-react";
interface Props {
  returnFunction: Function;
}

export default class DetailPage extends PureComponent<Props> {
  constructor(props?: any) {
    super(props);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  handleBackButton(e?: any) {
    const { returnFunction } = this.props;
    if (returnFunction) {
      returnFunction();
    }
  }

  render() {
    return (
      <>
        <Header></Header>
        <div>This should be detail pages.</div>
        <Button primary onClick={this.handleBackButton}>
          Back
        </Button>
      </>
    );
  }
}
