import React, { PureComponent } from "react";
import ItemContainer from "../ItemContainer";

interface Props {
  onClick?: Function;
  items?: Array<any> | Array<number>;
}
export default class ItemGroup extends PureComponent<Props> {
  constructor(props: any) {
    super(props);
    this.handleClicks = this.handleClicks.bind(this);
    this.prepareItems = this.prepareItems.bind(this);
  }

  prepareItems() {
    const { items } = this.props;
    console.log("items", items)
    const returnedItems = [];
    if (items && items.length > 0) {
      for (let x = 0; x < items.length; x += 1) {
        console.log('items pushing', items[x]);
        returnedItems.push(<ItemContainer key={`${x}-${items[x].id}`}id={items[x].id} name={items[x].name}onClick={this.handleClicks}/>);
      }
    }
    return returnedItems;
  }

  handleClicks(id: string) {
    const { onClick } = this.props;
    if (onClick) {
      onClick(id);
    }
  }

  render() {
    return<>{this.prepareItems()}</>;
  }
}
