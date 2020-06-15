import React, { PureComponent } from "react";
import ItemContainer from "../ItemContainer";
import LoadingDetails from "../LoadingDetails";
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
    const returnedItems = [];
    if (items && items.length > 0) {
      for (let x = 0; x < items.length; x += 1) {
        if (items[x].name) {
          returnedItems.push(
            <ItemContainer
              key={`${x}-${items[x].id}`}
              id={items[x].id}
              name={items[x].name}
              onClick={this.handleClicks}
            />
          );
        } else {
          returnedItems.push(<LoadingDetails />);
        }
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
    return <>{this.prepareItems()}</>;
  }
}
