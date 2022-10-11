import React from "react";
import { Col, ColProps } from "react-bootstrap";

interface Props {
  colNum: number;
  className?: string | null | undefined;
}

export class CutlyCol extends React.PureComponent<Props> {
  render() {
    const {colNum, className} = this.props;
    const mainContent: ColProps = {md: 12, xs: 12, sm: 12, lg: colNum, xl: colNum, xxl: colNum};
    return <Col {...mainContent} className={className as any}>{this.props.children}</Col>;
  }
}