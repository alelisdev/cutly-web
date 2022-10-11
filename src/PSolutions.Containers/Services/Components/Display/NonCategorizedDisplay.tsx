import React from "react";
import { IService } from "../../Types";
import { ServiceItem } from "../Service/ServiceItem";
import { CutlyDroppable } from "../../../../PSolutions.UI/Droppable";

interface Props {
  show: boolean;
  type: string;
  services: Array<IService>;
}

export class NonCategorizedDisplay extends React.PureComponent<Props> {
  render() {
    if (!this.props.show) return null;
    const {services} = this.props;
    return (
      <CutlyDroppable droppableId={this.props.type} type={this.props.type}>
        {services.map((service: IService, i: number) => <ServiceItem index={i} service={service} key={service.id}/>)}
      </CutlyDroppable>
    );
  }
}