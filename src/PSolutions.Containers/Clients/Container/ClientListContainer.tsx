import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IEmployee } from "../Types";
import { IRootState } from "../../../PSolutions.State";
import ClientHeader from "../Components/ClientHeader";
import { BusyIndicator } from "../../../PSolutions.UI/Loaders/BusyIndicator";
import { MainCard, MainCardBody } from "../../../PSolutions.Layout/Card/MainCard";
import ClientTables from "../Components/ClientTables";
import { clearState, getClientsAsync, setOrder, updateEmployeeOrderAsync } from "../Redux/Actions";

interface Props {
  isBusy: boolean;
  locationId: number;
  data: Array<IEmployee>;

  clearState(): void;

  setOrder(data: Array<IEmployee>): void;

  getClientsAsync(locationId: number): any;

  updateEmployeeOrderAsync(order: Array<IEmployee>): any;
}

class ClientListContainer extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount() {
    await this.props.getClientsAsync(this.props.locationId);
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  render() {
    const {data} = this.props;
    return (
      <MainCard>
        <ClientHeader/>
            <BusyIndicator show={this.props.isBusy}/>
            <ClientTables />
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
  return bindActionCreators({getClientsAsync, updateEmployeeOrderAsync, clearState, setOrder}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientListContainer);