import React from "react";
import Avatar from "react-avatar";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { FormattedMessage, IntlContext } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IService } from "../../Types";
import styles from "./service.item.module.css";
import { CutlyDraggable } from "../../../../PSolutions.UI/Draggable";

interface Props {
  index: number;
  service: IService;
  
}

export class ServiceItem extends React.PureComponent<Props> {
  static contextType = IntlContext;
  context!: React.ContextType<typeof IntlContext>;

  constructor(props: Props) {
    super(props);
    this.getServicePrice = this.getServicePrice.bind(this);
  }

  getServicePrice() {
    const {service} = this.props;
    const {priceTo, price, currency} = service;
    return !priceTo ? `${price} ${currency}` : `${price} - ${priceTo} ${currency}`
  }

  render() {
    const {service, index} = this.props;
    const linkTo = `Upsert/${service.id}`;
    return (
      <CutlyDraggable key={service.id} index={index} draggableId={service.id.toString()}>
        <div className={classNames("d-flex", styles.draggableHolder)}>
          <Avatar round name={service.serviceName} size="2.75em" src={service.servicePhoto} maxInitials={2}/>
          <div className="flex-1 ms-2 align-content-center">
            <h6 className="mb-0"><Link to={linkTo}>{service.serviceName}</Link></h6>
            <p className="fs--1 mb-0 pt-1 d-flex align-content-center fst-italic">
              <span className="d-sm-block"><FontAwesomeIcon icon="clock" className={styles.icon}/></span>
              <span className="fw-semi-bold"><span className="ps-1">{service.estimatedDuration}&nbsp;</span></span>
              <span className="fw-semi-bold pe-3"><FormattedMessage id="generic.messages.minutes"/></span>
              <span className="d-sm-block"><FontAwesomeIcon icon="tags" className={styles.icon}/></span>
              <span className="fw-semi-bold"><span className="ps-1">{this.getServicePrice()}&nbsp;</span></span>
            </p>
            <div className="border-dashed-bottom my-3"/>
          </div>
          <FontAwesomeIcon icon="bars" className={styles.draggableIndicator}/>
        </div>
      </CutlyDraggable>
    );
  }
}