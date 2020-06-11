import React, { PureComponent } from "react";
import { Item } from "semantic-ui-react";

interface Props {
  id?: string | number;
  onClick?: Function;
}
export default class ItemContainer extends PureComponent<Props> {
    render() {
    const {id, onClick} =  this.props;
    return <Item>
        <Item.Header as="a" onClick={onClick}>Movie - {id}</Item.Header>
        <Item.Content>
            <Item.Description>
                This is a MOVIE.
            </Item.Description>
        </Item.Content>
    </Item>;
  }
}
