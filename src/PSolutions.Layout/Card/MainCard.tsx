import React from "react";
import cn from 'classnames';
import { Card } from "react-bootstrap";
import styles from './MainCard.module.css'

export class MainCard extends React.PureComponent {
  render() {
    return (
      <Card className={cn(styles.fullHeightCard)}>{this.props.children}</Card>
    );
  }
}

export class MainCardBody extends React.PureComponent {
  render() {
    return <Card.Body className={styles.cardBody}>{this.props.children}</Card.Body>
  }
}