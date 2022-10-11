import React from "react";

export class PSFormFooter extends React.PureComponent {
  render() {
    return <div className="text-end">{this.props.children}</div>
  }
}