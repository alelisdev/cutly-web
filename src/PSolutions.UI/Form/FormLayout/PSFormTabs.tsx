import React from "react";
import { Nav } from "react-bootstrap";
import { NavItemPill } from "../../Navs/NavItemPill";
import { ITab } from "../../../PSolutions.Contracts/UI";

interface Props {
  show: boolean;
  tabs: Array<ITab>;
  activeTab: number;

  setActiveTab(tabId: number): void;
}

export class PSFormTabs extends React.PureComponent<Props> {
  render() {
    if (!this.props.show) return null;
    const {setActiveTab} = this.props;
    return (
      <Nav variant="pills">
        {this.props.tabs.map((t: ITab, i: number) => <NavItemPill key={i} tab={t} activeTab={this.props.activeTab} setActiveTab={setActiveTab}/>)}
      </Nav>
    );
  }
}