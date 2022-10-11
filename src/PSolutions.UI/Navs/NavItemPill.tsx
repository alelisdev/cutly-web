import React from "react";
import cn from 'classnames';
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './nav.item.pill.module.css';
import { ITab } from "../../PSolutions.Contracts/UI";

interface Props {
  tab: ITab;
  activeTab: number;

  setActiveTab(tabId: number): void;
}

export class NavItemPill extends React.PureComponent<Props> {
  render() {
    const {tab, activeTab, setActiveTab} = this.props;
    const isActive = activeTab === tab.tabId;
    return (
      <Nav.Item>
        <Nav.Link className={cn('fw-semi-bold', styles.navItemPill)} onClick={() => setActiveTab(tab.tabId)}>
          <div className={cn("d-flex align-items-center", {[styles.active]: isActive})}>
            {!!tab.icon && <FontAwesomeIcon icon={this.props.tab.icon}/>}
            <span className="d-none d-md-block mt-1 fs--1 ms-2">{tab.label}</span>
          </div>
        </Nav.Link>
      </Nav.Item>
    );
  }
}