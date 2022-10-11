import React from "react";
import { connect } from "react-redux";
import { IntlContext } from "react-intl";
import { Params } from "react-router-dom";
import { Formik, FormikHelpers } from "formik";
import { bindActionCreators, Dispatch } from "redux";
import { ICategory } from "../Types";
import { CategorySchema } from "./CategorySchema";
import { IRootState } from "../../../PSolutions.State";
import { CategoryUpsertView } from "../Views/CategoryUpsertView";
import { BusyIndicator } from "../../../PSolutions.UI/Loaders/BusyIndicator";
import { withNavigation, withParams } from "../../../PSolutions.Providers/Navigation";
import { addCategoryAsync, clearState, getCategoryAsync, updateCategoryAsync } from "../Redux/Actions";

interface Props {
  isBusy: boolean;
  locationId: number;
  category: ICategory
  params: Readonly<Params>;

  clearState(): void;

  navigate(to: any, options?: any): void;

  getCategoryAsync(categoryId: string): any;

  addCategoryAsync(category: ICategory): any;

  updateCategoryAsync(category: ICategory): any;
}

class EmployeeUpsertContainer extends React.PureComponent<Props> {
  static contextType = IntlContext;
  context!: React.ContextType<typeof IntlContext>;

  constructor(props: Props) {
    super(props);
    this.submitAsync = this.submitAsync.bind(this);
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  async componentDidMount() {
    const id = this.props.params.id || 0;
    if (!!id) await this.props.getCategoryAsync(id);
  }

  async submitAsync(values: ICategory, formikActions: FormikHelpers<any>) {
    values.branchOfficeId = this.props.locationId;
    const updated = await this.props.addCategoryAsync(values);

    formikActions.setSubmitting(false);
    if (!!updated) this.props.navigate(-1);
  }

  render() {
    return (
      <React.Fragment>
        <BusyIndicator show={this.props.isBusy}/>
        <Formik
          enableReinitialize={true}
          onSubmit={this.submitAsync}
          component={CategoryUpsertView}
          validationSchema={CategorySchema}
          initialValues={this.props.category}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    isBusy: state.categories.isBusy,
    category: state.categories.selectedItem,
    locationId: state.currentLocation.locationId,
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({clearState, getCategoryAsync, updateCategoryAsync, addCategoryAsync}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withParams(withNavigation(EmployeeUpsertContainer)));