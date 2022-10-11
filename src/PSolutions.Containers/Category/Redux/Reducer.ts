import { Reducer } from "redux";
import { CategoryActions } from "./Actions";
import { ICategory, ICategoryProps } from "../Types";
import { CategoryActionsEnum } from "./ReduxActions";

const initialState: ICategoryProps = {
  data: [],
  page: 1,
  nextPage: 1,
  isBusy: false,
  pageSize: 25,
  totalCount: 0,
  hasMore: false,
  errorMessage: "",
  showError: false,
  selectedItem: {
    id: 0,
    name: "",
    branchOfficeId: 0,
    description: "",
  } as ICategory
};

const CategoryReducer: Reducer<ICategoryProps, CategoryActions> = (state: ICategoryProps = initialState, action: CategoryActions) => {
  switch (action.type) {
    // Gets locations
    case CategoryActionsEnum.GET_CATEGORY_LIST_REQUESTED:
      return {...state, isBusy: true};
    case CategoryActionsEnum.GET_CATEGORY_LIST_SUCCESS:
      return {...state, isBusy: false, data: action.payload};
    case CategoryActionsEnum.GET_CATEGORY_LIST_FAILURE:
      return {...state, isBusy: false, showError: true, errorMessage: action.payload.displayMessage};

    case CategoryActionsEnum.GET_CATEGORY_REQUESTED:
      return {...state, isBusy: true}
    case CategoryActionsEnum.GET_CATEGORY_FETCHED:
      return {...state, isBusy: false, selectedItem: action.payload}
    case CategoryActionsEnum.GET_CATEGORY_FAILURE:
      return {...state, isBusy: false, showError: true, errorMessage: action.payload.displayMessage};

    // Update order
    case CategoryActionsEnum.UPDATE_ORDER_REQUESTED:
      return {...state, isBusy: true};
    case CategoryActionsEnum.UPDATE_ORDER_SUCCESS:
      return {...state, isBusy: false};
    case CategoryActionsEnum.UPDATE_ORDER_FAILURE:
      return {...state, isBusy: false};

    // Update order
    case CategoryActionsEnum.UPDATE_CATEGORY_REQUESTED:
      return {...state, isBusy: true};
    case CategoryActionsEnum.UPDATE_CATEGORY_SUCCESS:
      return {...state, isBusy: false};
    case CategoryActionsEnum.UPDATE_CATEGORY_FAILURE:
      return {...state, isBusy: false};

    // Adds new location
    case CategoryActionsEnum.ADD_CATEGORY_REQUESTED:
      return {...state, isBusy: true};
    case CategoryActionsEnum.ADD_CATEGORY_SUCCESS:
      return {...state, isBusy: false};
    case CategoryActionsEnum.ADD_CATEGORY_FAILURE:
      return {...state, isBusy: false, showError: true, errorMessage: action.payload.displayMessage};

    case CategoryActionsEnum.CATEGORY_SET_SELECTED_ITEM:
      return {...state, selectedItem: {...state.selectedItem, id: action.payload.id}}
    case CategoryActionsEnum.CATEGORY_SET_ORDER:
      return {...state, data: [...action.payload]}
    case CategoryActionsEnum.CATEGORY_CLEAR_ERROR:
      return {...state, showError: false, errorMessage: ""}
    case CategoryActionsEnum.CATEGORY_CLEAR_STATE:
      return {...state, ...initialState}
    default:
      return state;
  }
}

export { CategoryReducer };