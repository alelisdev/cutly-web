import React from "react";
import { IService } from "../../Types";
import { ICategory } from "../../../Category/Types";
import { ServiceItem } from "../Service/ServiceItem";
import { CategoryItem } from "../Category/CategoryItem";
import { CutlyDroppable } from "../../../../PSolutions.UI/Droppable";

interface Props {
  type: string;
  show: boolean;
  itemType: string;
  services: Array<IService>;
  categories: Array<ICategory>;
}


export class CategorizedDisplay extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.getServices = this.getServices.bind(this);
  }

  getServices(category: ICategory): Array<IService> {
    return this.props.services.filter(service => service.categoryId === category.id);
  }

  render() {
    if (!this.props.show) return null;
    const categories = this.props.categories;
    return (
      <CutlyDroppable type={this.props.type} droppableId="categorized">
        {
          categories.map((category: ICategory, index: number) => (
            <CategoryItem key={index} index={index} category={category}>
              <CutlyDroppable droppableId={category.id.toString()} type={this.props.itemType}>
                {this.getServices(category).map((service: IService, ind: number) => <ServiceItem key={ind} index={ind} service={service}/>)}
              </CutlyDroppable>
            </CategoryItem>
          ))}
      </CutlyDroppable>
    );
  }
}