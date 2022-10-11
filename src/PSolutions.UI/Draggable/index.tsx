import React from "react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";

interface Props {
  index: number;
  disableDrag: boolean;
  draggableId: string;
}

export class CutlyDraggable extends React.PureComponent<Props> {
  static defaultProps = {disableDrag: false};

  constructor(props: Props) {
    super(props);
    this.renderProvided = this.renderProvided.bind(this);
  }

  renderProvided(provided: DraggableProvided) {
    return <div ref={provided.innerRef}{...provided.draggableProps} {...provided.dragHandleProps}>{this.props.children}</div>
  }

  render() {
    const {index, draggableId, disableDrag} = this.props;
    return (
      <Draggable key={draggableId} isDragDisabled={disableDrag} draggableId={draggableId} index={index}>
        {(provided => this.renderProvided(provided))}
      </Draggable>
    );
  }
}