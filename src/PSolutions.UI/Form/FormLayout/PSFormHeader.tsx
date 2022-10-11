import React from "react";
import { Card } from "react-bootstrap";
import { PSFormTabs } from "./PSFormTabs";
import { ITab } from "../../../PSolutions.Contracts/UI";

interface Props {
  title: string;
  tabs?: Array<ITab>;
  activeTab?: number;
  lightBody?: boolean;

  setActiveTab?(tabId: number): void;
}

export class PSFormHeader extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.handleTabSelection = this.handleTabSelection.bind(this);
  }

  handleTabSelection(tabId: number) {
    const tabs = this.props.tabs || [];
    if (!!tabs && this.props.setActiveTab) this.props.setActiveTab(tabId);
  }

  render() {
    const tabs = this.props.tabs || [];
    const activeTab = this.props.activeTab || 0;
    const lightBody = !!this.props.lightBody ? "bg-light" : "";
    return (
      <Card.Header className={lightBody}>
        {!tabs.length && <h5>{this.props.title}</h5>}
        <PSFormTabs tabs={tabs} show={!!tabs.length} activeTab={activeTab} setActiveTab={this.handleTabSelection}/>
      </Card.Header>
    );
  }
}
