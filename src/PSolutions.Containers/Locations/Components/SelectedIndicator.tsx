import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '../Styles/locations.module.css';

interface Props {
  checked: boolean;
}

export class SelectedIndicator extends React.PureComponent<Props> {
  render() {
    if (!this.props.checked) return null;
    return <div className={styles.wrapper}><FontAwesomeIcon icon="check" className={styles.icon} /></div>;
  }
}