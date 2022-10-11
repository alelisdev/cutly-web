import React from "react";
import { IntlContext } from "react-intl";
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
}

export class EmptyCategoryDisplay extends React.PureComponent<Props> {
  static contextType = IntlContext;
  context!: React.ContextType<typeof IntlContext>;

  constructor(props: Props) {
    super(props);
    this.getServices = this.getServices.bind(this);
    this.getEmptyCategory = this.getEmptyCategory.bind(this);
  }

  getServices() {
    return this.props.services.filter(service => !service.categoryId);
  }

  getEmptyCategory(): ICategory {
    const description = this.context.formatMessage({id: "categories.non.categorized.description"})
    const name = this.context.formatMessage({id: "categories.non.categorized"})
    return {id: 0, description, name, branchOfficeId: 0};
  }

  render() {
    if (!this.props.show) return null;
    const services = this.getServices();
    const emptyCategory = this.getEmptyCategory();
    return (
      <CutlyDroppable type="nonCategorizedItem" droppableId="nonCategorized">
        <CategoryItem index={-1} category={emptyCategory} dragDisabled={true}>
          <CutlyDroppable droppableId="0" type={this.props.itemType}>
            {services.map((service: IService, index: number) => <ServiceItem key={index} index={index} service={service}/>)}
          </CutlyDroppable>
        </CategoryItem>
      </CutlyDroppable>
    );
  }
}