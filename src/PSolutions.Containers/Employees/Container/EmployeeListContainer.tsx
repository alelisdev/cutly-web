import React from "react";
import { connect } from "react-redux";
import { DropResult } from 'react-beautiful-dnd';
import { bindActionCreators, Dispatch } from "redux";
import { DragDropContext } from 'react-beautiful-dnd';
import { IEmployee } from "../Types";
import EmployeeItem from "../Components/EmployeeItem";
import { IRootState } from "../../../PSolutions.State";
import EmployeeHeader from "../Components/EmployeeHeader";
import { CutlyDroppable } from "../../../PSolutions.UI/Droppable";
import { hasChanges, reorderList } from "../../Services/Utilities";
import { BusyIndicator } from "../../../PSolutions.UI/Loaders/BusyIndicator";
import { MainCard, MainCardBody } from "../../../PSolutions.Layout/Card/MainCard";
import { clearState, getEmployeesAsync, setOrder, updateEmployeeOrderAsync } from "../Redux/Actions";

interface Props {
  isBusy: boolean;
  locationId: number;
  data: Array<IEmployee>;

  clearState(): void;

  setOrder(data: Array<IEmployee>): void;

  getEmployeesAsync(locationId: number): any;

  updateEmployeeOrderAsync(order: Array<IEmployee>): any;
}

class EmployeeListContainer extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.handleDragEndAsync = this.handleDragEndAsync.bind(this);
  }

  async componentDidMount() {
    await this.props.getEmployeesAsync(this.props.locationId);
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  async handleDragEndAsync(result: DropResult) {
    const {data} = this.props;
    const {source, destination} = result;

    if (!destination || !hasChanges(result)) return;
    const items = reorderList(data, source.index, destination.index)

    this.props.setOrder(items);
    await this.props.updateEmployeeOrderAsync(items);
  }

  render() {
    const {data} = this.props;
    return (
      <MainCard>
        <EmployeeHeader/>
        <MainCardBody>
          <DragDropContext onDragEnd={this.handleDragEndAsync}>
            <BusyIndicator show={this.props.isBusy}/>
            <CutlyDroppable droppableId="droppable" type="employees">
              {data.map((e: IEmployee, i: number) => <EmployeeItem index={i} employee={e} key={e.id}/>)}
            </CutlyDroppable>
          </DragDropContext>
        </MainCardBody>
      </MainCard>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    page: state.employee.page,
    data: state.employee.data,
    isBusy: state.employee.isBusy,
    hasMore: state.employee.hasMore,
    nextPage: state.employee.nextPage,
    pageSize: state.employee.pageSize,
    showError: state.employee.showError,
    totalCount: state.employee.totalCount,
    errorMessage: state.employee.errorMessage,
    selectedItem: state.employee.selectedItem,
    locationId: state.currentLocation.locationId,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({getEmployeesAsync, updateEmployeeOrderAsync, clearState, setOrder}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeListContainer);