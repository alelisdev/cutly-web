import React from "react";
import { Col } from "react-bootstrap";

interface Props {
  columns: number;
  className?: string;
}

export class PSCardSideBar extends React.PureComponent<Props> {
  render() {
    const {columns, className} = this.props;
    const options = {span: columns, order: 1};
    return (
      <Col xl={options} className={className}>
        <div className="sticky-sidebar">{this.props.children}</div>
      </Col>
    );
  }
}