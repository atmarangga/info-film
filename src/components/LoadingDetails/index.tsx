import React, { PureComponent } from "react";
import { Placeholder, Container, Item } from "semantic-ui-react";

interface Props {}

export default class LoadingItems extends PureComponent<Props> {
  render() {
    return (
      <Container>
        <Item>
          <Placeholder>
            <Placeholder.Header />
            <Placeholder.Paragraph >
                <Placeholder.Line />
                <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </Item>
      </Container>
    );
  }
}
