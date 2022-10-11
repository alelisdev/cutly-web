import React from "react";
import { Modal } from "react-bootstrap";
import { ScaleLoader } from "react-spinners";
import styles from './busy.indicator.module.css';

interface Props {
  show: boolean;
}

export class BusyIndicator extends React.PureComponent<Props> {
  render() {
    const {show} = this.props;
    return (
      <Modal contentClassName={styles.content} show={show} size="sm" backdropClassName={styles.backdrop}>
        <div className={styles.contentWrapper}>
          <div className={styles.container}><ScaleLoader css={styles.loader} color="white"/></div>
        </div>
      </Modal>
    );
  }
}