import React, { PureComponent } from "react";
import ItemContainer from "../ItemContainer";

interface Props {
  onClick?: Function;
  items?: Array<string> | Array<number>;
}
export default class ItemGroup extends PureComponent<Props> {
  constructor(props: any) {
    super(props);
    this.handleClicks = this.handleClicks.bind(this);
    this.prepareItems = this.prepareItems.bind(this);
  }

  prepareItems() {
    const { items } = this.props;
    const returnedItems = [];
    if (items && items.length > 0) {
      for (let x = 0; x < items.length; x += 1) {
        returnedItems.push(<ItemContainer key={`${x}-${items[x]}`}id={items[x]} onClick={this.handleClicks}/>);
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
