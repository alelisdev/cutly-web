import React from "react";

interface Props {
  tabId: number;
  activeTab: number;
}

export class PSFormTabHolder extends React.PureComponent<Props> {
  render() {
    const {tabId, activeTab} = this.props;
    if (tabId !== activeTab) return null;
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}