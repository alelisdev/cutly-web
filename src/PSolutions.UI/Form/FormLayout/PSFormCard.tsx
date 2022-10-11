import React from "react";
import { Card, Col } from "react-bootstrap";
import { PSFormHeader } from "./PSFormHeader";
import { ITab } from "../../../PSolutions.Contracts/UI";

interface Props {
  title: string;
  columns: number
  activeTab?: number;
  className?: string;
  lightBody?: boolean;
  tabs?: Array<ITab>,
  bodyRef?: React.RefObject<HTMLDivElement>;

  setActiveTab?(tabId: number): void;
}

export class PSFormCard extends React.PureComponent<Props> {
  static defaultProps = {columns: 12, lightBody: false}

  render() {
    const css = !!this.props.lightBody ? "" : "bg-light";
    const {activeTab, className, columns, title, setActiveTab, tabs, lightBody} = this.props;
    return (
      <Col xl={columns} className={className}>
        <Card>
          <PSFormHeader title={title} tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} lightBody={lightBody}/>
          <Card.Body className={css} ref={this.props.bodyRef}>{this.props.children}</Card.Body>
        </Card>
      </Col>
    );
  }
}