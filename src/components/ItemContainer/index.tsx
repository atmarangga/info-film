import React, { PureComponent } from "react";
import { Item } from "semantic-ui-react";

interface Props {
  id?: string | number;
  onClick?: Function;
  name?: string;
}
export default class ItemContainer extends PureComponent<Props> {
  constructor(props?: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { onClick, id } = this.props;
    if (onClick) {
      onClick(id);
    }
  }

  render() {
    const { id, name } = this.props;
    return (
      <Item style={styles.container}>
        <Item.Header style={styles.header} as="a" onClick={this.handleClick}>
          {name}
        </Item.Header>
        <Item.Content style={styles.content}>
          {/* <Item.Description style={styles.description}>This is a MOVIE.</Item.Description> */}
          {/* <Item.Extra style={styles.extra}>You should just click the header for more details</Item.Extra> */}
        </Item.Content>
      </Item>
    );
  }
}

const styles = {
    header:{
        fontSize: 26,
        marginBottom: 5,
    },
    content:{
        marginTop: 5
    },
    description: {
        fontSize: 16,
        color: "#000"
    },
    extra: {
        fontSize: 12,
        color: "#a0a0a0"
    },
    container: {
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
        backgroundColor: '#fafafa'
    }
}