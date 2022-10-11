import React from "react";
import Avatar from "react-avatar";
import classNames from 'classnames';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IntlContext } from "react-intl";
import { bindActionCreators, Dispatch } from "redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IService } from "../Types";
import { IEmployee } from "../../Employees/Types";
import styles from '../Styles/services.module.css';
import { setSelectedItem, toggleSelectedEmployee } from "../Redux/Actions";

interface Props {
  index: number;
  values: IService,
  employee: IEmployee;
  selectedEmployees: Array<number>;

  setSelectedItem(values: IService): void;

  toggleSelectedEmployee(employee: IEmployee): void;
}

class ServiceEmployeeItem extends React.PureComponent<Props> {
  static contextType = IntlContext;
  context!: React.ContextType<typeof IntlContext>;

  constructor(props: Props) {
    super(props);
    this.toggleService = this.toggleService.bind(this);
  }

  toggleService() {
    this.props.setSelectedItem(this.props.values);
    this.props.toggleSelectedEmployee(this.props.employee)
  }

  render() {
    const name = this.props.employee.firstName;
    const photo = this.props.employee.profilePhoto;
    const linkTo = `/Employees/Upsert/${this.props.employee.id}`;
    const checked = this.props.selectedEmployees.includes(this.props.employee.id);

    const color = checked ? "var(--falcon-primary)" : "var(--falcon-400)";
    const icon: any = checked ? ["fas", "square-check"] : ["far", "square"];
    const title = this.props.employee?.title || this.context.formatMessage({id: "generic.messages.no.title"});
    
    return (
      <div className={classNames("d-flex", styles.draggableHolder)}>
        <Avatar round name={name} size="2.75em" src={photo} maxInitials={2}/>
        <div className="flex-1 ms-2 align-content-center">
          <h6 className="mb-0"><Link to={linkTo}>{name}</Link></h6>
          <p className="fs--1 mb-0">{title}</p>
          <div className="border-dashed-bottom my-3"/>
        </div>
        <FontAwesomeIcon icon={icon} className={styles.draggableIndicator} color={color} onClick={this.toggleService}/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({toggleSelectedEmployee, setSelectedItem}, dispatch);
}

export default connect(null, mapDispatchToProps)(ServiceEmployeeItem);