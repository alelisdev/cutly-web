import React from "react";
import Avatar from "react-avatar";
import classNames from 'classnames';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IntlContext } from "react-intl";
import { bindActionCreators, Dispatch } from "redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import { IEmployee } from "../Types";
import styles from '../Styles/employees.module.css';
import { setSelectedItem } from "../Redux/Actions";
import { withNavigation } from "../../../PSolutions.Providers/Navigation";

interface Props {
  index: number;
  employee: IEmployee;

  navigate(to: string): void;

  setSelectedItem(employee: IEmployee): void;
}

class EmployeeItem extends React.PureComponent<Props> {
  static contextType = IntlContext;
  context!: React.ContextType<typeof IntlContext>;

  constructor(props: Props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  preventDouble(e: any) {
    e.preventDefault();
  }

  handleClick() {
    this.props.navigate(`Upsert/${this.props.employee.id}`);
  }

  render() {
    const color = "var(--falcon-avatar-name-bg)";
    const id = this.props.employee.id.toString();
    const photo = this.props.employee.profilePhoto;
    const name = `${this.props.employee.firstName} ${this.props.employee.lastName}`
    const title = this.props.employee?.title || this.context.formatMessage({id: "generic.messages.no.title"});
    return (
      <Draggable draggableId={id} index={this.props.index}>
        {
          ((provided: DraggableProvided) => (
            <div {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
              <div className={classNames("d-flex", styles.draggableHolder)} onClick={this.handleClick}>
                <Avatar round name={name} size="2.75em" src={photo} color={color} maxInitials={2}/>
                <div className="flex-1 ms-2 align-content-center">
                  <h6 className="mb-0"><Link onClick={this.preventDouble} to={`Upsert/${id}`}>{name}</Link></h6>
                  <p className="fs--1 mb-0">{title}</p>
                  <div className="border-dashed-bottom my-3"/>
                </div>
                <FontAwesomeIcon icon="bars" className={styles.draggableIndicator} color="var(--falcon-400)"/>
              </div>
            </div>
          ))
        }
      </Draggable>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({setSelectedItem}, dispatch);
}

export default connect(null, mapDispatchToProps)(withNavigation(EmployeeItem));