import _ from 'lodash';
import React from "react";
import { connect } from "react-redux";
import { Row } from "react-bootstrap";
import { IntlContext } from "react-intl";
import { bindActionCreators, Dispatch } from "redux";
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { ICategory } from "../../Category/Types";
import { IRootState } from "../../../PSolutions.State";
import ServiceHeader from "../Components/Header/ServiceHeader";
import { CutlyCol } from "../../../PSolutions.Layout/Grid/CutlyCol";
import { withNavigation } from "../../../PSolutions.Providers/Navigation";
import { CategorizedDisplay } from "../Components/Display/CategorizedDisplay";
import { BusyIndicator } from "../../../PSolutions.UI/Loaders/BusyIndicator";
import { EmptyCategoryDisplay } from "../Components/Display/EmptyCategoryDisplay";
import { IOrderCategoryRequest, IOrderServicesRequest, IService } from "../Types";
import { MainCard, MainCardBody } from "../../../PSolutions.Layout/Card/MainCard";
import { NonCategorizedDisplay } from "../Components/Display/NonCategorizedDisplay";
import { hasChanges, reorderDifferentCategory, reorderList, reorderSameCategory } from "../Utilities";
import { getCategoriesAsync, setOrder as setCategoryOrder, updateCategoryOrderAsync, } from "../../Category/Redux/Actions";
import { clearState, getServicesAsync, setOrder, updateServicesOrderAsync, updateServicesOrderAndCategoryAsync } from "../Redux/Actions";

interface Props {
  isBusy: boolean;
  locationId: number;
  isFetching: boolean;
  data: Array<IService>;
  categories: Array<ICategory>

  clearState(): void;

  navigate(to: string): void;

  setOrder(data: Array<IService>): void;

  getServicesAsync(locationId: number): any;

  getCategoriesAsync(locationId: number): any;

  setCategoryOrder(categories: Array<ICategory>): void;

  updateServicesOrderAsync(order: Array<IService>): any;

  updateCategoryOrderAsync(categories: Array<ICategory>): any;

  updateServicesOrderAndCategoryAsync(services: Array<IService>): any;
}

interface State {
}

class ServicesListContainer extends React.PureComponent<Props, State> {
  static contextType = IntlContext;
  private readonly serviceType: string;
  private readonly categoryType: string;
  private readonly nonCategorized: string;
  context!: React.ContextType<typeof IntlContext>;

  constructor(props: Props) {
    super(props);
    this.serviceType = "ServiceItem";
    this.categoryType = "CategoryItem";
    this.nonCategorized = "NonCategorized";
    this.handleDragEndAsync = this.handleDragEndAsync.bind(this);
    this.reorderServicesAsync = this.reorderServicesAsync.bind(this);
    this.reorderCategoriesAsync = this.reorderCategoriesAsync.bind(this);
    this.reorderServicesAndCategoriesAsync = this.reorderServicesAndCategoriesAsync.bind(this);
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  async componentDidMount() {
    const categories: Array<ICategory> = await this.props.getCategoriesAsync(this.props.locationId);
    if (!!categories?.length) this.setState({activeCategoryId: categories[0].id});
    await this.props.getServicesAsync(this.props.locationId);
  }

  async handleDragEndAsync(result: DropResult) {
    if (!result.destination || !hasChanges(result)) return;
    if (result.type === this.categoryType) return await this.reorderCategoriesAsync(result);
    if (result.type === this.nonCategorized) return await this.reorderServicesAsync(result);
    else if (result.type === this.serviceType) return await this.reorderServicesAndCategoriesAsync(result);
  }

  async reorderServicesAsync(result: DropResult) {
    const {data} = this.props;
    const {source, destination} = result;

    if (!destination || !hasChanges(result)) return;
    const items = reorderList(data, source.index, destination.index)

    this.props.setOrder(items);
    await this.props.updateServicesOrderAsync(items);
  }

  async reorderCategoriesAsync(result: DropResult) {
    const {categories} = this.props;
    const {source, destination} = result;

    if (!destination || !hasChanges(result)) return;
    const items = reorderList(categories, source.index, destination.index)

    this.props.setCategoryOrder(items);
    await this.props.updateCategoryOrderAsync(items);
  }

  async reorderServicesAndCategoriesAsync(result: DropResult) {
    const {data} = this.props;
    let newData: Array<IService> = [];
    if (!result.destination?.droppableId || !hasChanges(result)) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const sourceCategory = parseInt(result.source.droppableId);
    const destinationCategory = parseInt(result.destination?.droppableId);
    const groupedServices = _.groupBy(data, (s: IService) => s?.categoryId || 0);

    // Extract groups
    const sourceServices = groupedServices[sourceCategory] || [];
    const destinationServices = groupedServices[destinationCategory] || [];

    const request: IOrderCategoryRequest = {sourceServices, sourceIndex, destinationIndex, allServices: data};
    const request2: IOrderServicesRequest = {...request, destinationServices: destinationServices, destinationCategory};
    newData = sourceCategory === destinationCategory ? reorderSameCategory(request) : reorderDifferentCategory(request2);

    this.props.setOrder(newData);
    await this.props.updateServicesOrderAndCategoryAsync(newData);
  }

  render() {
    const {data, categories, isBusy, isFetching} = this.props;
    const hasCategories = !!categories && categories.length > 0;
    return (
      <Row>
        <CutlyCol colNum={12}>
          <MainCard>
            <ServiceHeader/>
            <MainCardBody>
              <DragDropContext onDragEnd={this.handleDragEndAsync}>
                <NonCategorizedDisplay services={data} show={!hasCategories} type={this.nonCategorized}/>
                <EmptyCategoryDisplay services={data} type={this.categoryType} itemType={this.serviceType} show={hasCategories}/>
                <CategorizedDisplay services={data} categories={categories} type={this.categoryType} itemType={this.serviceType} show={hasCategories}/>
              </DragDropContext>
              <BusyIndicator show={isBusy || isFetching}/>
            </MainCardBody>
          </MainCard>
        </CutlyCol>
      </Row>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    page: state.services.page,
    data: state.services.data,
    isBusy: state.services.isBusy,
    hasMore: state.services.hasMore,
    nextPage: state.services.nextPage,
    pageSize: state.services.pageSize,
    categories: state.categories.data,
    isFetching: state.categories.isBusy,
    showError: state.services.showError,
    totalCount: state.services.totalCount,
    errorMessage: state.services.errorMessage,
    selectedItem: state.services.selectedItem,
    locationId: state.currentLocation.locationId,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({
    updateServicesOrderAndCategoryAsync,
    updateServicesOrderAsync,
    updateCategoryOrderAsync,
    getCategoriesAsync,
    getServicesAsync,
    setCategoryOrder,
    clearState,
    setOrder
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ServicesListContainer));