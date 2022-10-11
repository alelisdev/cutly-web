import React from "react";
import classNames from "classnames";
import { IntlContext } from "react-intl";
import { Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './category.item.module.css';
import { ICategory } from "../../../Category/Types";
import { CollapseButton } from "./CollapseButton";
import { CutlyDraggable } from "../../../../PSolutions.UI/Draggable";

interface Props {
  index: number;
  children: any;
  category: ICategory;
  dragDisabled: boolean;
}

interface State {
  open: boolean;
}

export class CategoryItem extends React.PureComponent<Props, State> {
  static contextType = IntlContext;
  static defaultProps = {dragDisabled: false};
  context!: React.ContextType<typeof IntlContext>;

  constructor(props: Props) {
    super(props);
    this.state = {open: false};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.setState({open: !this.state.open})
  }

  render() {
    const aria = `category-${this.props.category.id}`;
    const {category, index, dragDisabled} = this.props;
    return (
      <CutlyDraggable index={index} draggableId={category.id.toString()} disableDrag={dragDisabled}>
        <div className={classNames("d-flex", styles.draggableHolder)}>
          <FontAwesomeIcon icon="bars" className={styles.draggableIndicator}/>
          <CollapseButton aria={aria} expanded={this.state.open} handleClick={this.handleClick}/>
          <div className="flex-1 ms-2 align-content-center ps-2">
            <h6 className={classNames("mb-0", styles.header)}>{category.name}</h6>
            <div className="border-dashed-bottom my-3 pt-1"/>
            <Collapse in={this.state.open}>
              <div id={aria}>{this.props.children}</div>
            </Collapse>
          </div>
        </div>
      </CutlyDraggable>
    );
  }
}