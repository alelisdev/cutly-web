import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './category.item.module.css';

interface Props {
  aria: string;
  expanded: boolean;

  handleClick(): void;
}

export class CollapseButton extends React.PureComponent<Props> {
  render() {
    const {aria, expanded, handleClick} = this.props;
    const icon = expanded ? "chevron-up": 'chevron-down';
    return <FontAwesomeIcon icon={icon} aria-controls={aria} aria-expanded={expanded} onClick={handleClick} className={styles.collapseButtonIcon}/>;
  }
}