import React from "react";

interface Props {
  children: any;
}

export class MainContent extends React.PureComponent<Props> {
  render() {
    return <div className="content">{this.props.children}</div>;
  }
}