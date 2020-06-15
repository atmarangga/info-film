import React, { PureComponent } from "react";
import { Container, Placeholder } from "semantic-ui-react";
interface Props {}
export default class LoadingCustom extends PureComponent<Props> {
  render() {
    return (
      <Container>
        <Placeholder>
          <Placeholder.Header as="h2"/>
          <Placeholder.Line />
          <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>
      </Container>
    );
  }
}

