import React from "react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import styles from './droppable.module.css';

interface Props {
  type: string;
  droppableId: string;
  disableDrop: boolean;
  noPlaceholder: boolean;
}

export class CutlyDroppable extends React.PureComponent<Props> {
  static defaultProps = {noPlaceholder: false, disableDrop: false};

  constructor(props: Props) {
    super(props);
    this.renderProvided = this.renderProvided.bind(this);
  }

  renderProvided(provided: DroppableProvided) {
    const {noPlaceholder} = this.props;
    const placeholder = noPlaceholder ? null : provided.placeholder;
    return <div ref={provided.innerRef} className={styles.droppableContainer}>{this.props.children}{placeholder}</div>
  }

  render() {
    const {droppableId, type, disableDrop} = this.props;
    return <Droppable droppableId={droppableId} isDropDisabled={disableDrop} type={type}>{(provided => this.renderProvided(provided))}</Droppable>
  }
}