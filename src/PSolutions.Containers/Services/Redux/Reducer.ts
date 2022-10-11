import { Reducer } from "redux";
import { ServiceActions } from "./Actions";
import { IService, IServiceProps } from "../Types";
import { ServicesActionsEnum } from "./ReduxActions";
import { insertOrRemove } from "../../../PSolutions.Utility/ArrayUtilities";

const initialState: IServiceProps = {
  data: [],
  page: 1,
  nextPage: 1,
  isBusy: false,
  pageSize: 25,
  totalCount: 0,
  hasMore: false,
  errorMessage: "",
  isDeleting: false,
  showError: false,
  selectedItem: {
    id: 0,
    price: 0,
    color: 0,
    index: 0,
    employees: [],
    currency: "",
    priceTypeEnum: 0,
    description: "",
    serviceName: "",
    servicePhoto: "",
    priceTo: undefined,
    categoryId: undefined,
    branchOfficeId: 0,
    estimatedDuration: 0,
    englishTranslation: "",
    englishDescriptionTranslation: "",
  } as IService
};


const ServiceReducer: Reducer<IServiceProps, ServiceActions> = (state: IServiceProps = initialState, action: ServiceActions) => {
  switch (action.type) {
    // Gets locations
    case ServicesActionsEnum.GET_SERVICE_LIST_REQUESTED:
      return {...state, isBusy: true};
    case ServicesActionsEnum.GET_SERVICE_LIST_SUCCESS:
      return {...state, isBusy: false, data: action.payload};
    case ServicesActionsEnum.GET_SERVICE_LIST_FAILURE:
      return {...state, isBusy: false, showError: true, errorMessage: action.payload.displayMessage};

    case ServicesActionsEnum.GET_SERVICE_REQUESTED:
      return {...state, isBusy: true}
    case ServicesActionsEnum.GET_SERVICE_FETCHED:
      return {...state, isBusy: false, selectedItem: action.payload}
    case ServicesActionsEnum.GET_SERVICE_FAILURE:
      return {...state, isBusy: false, showError: true, errorMessage: action.payload.displayMessage};

    // Update order
    case ServicesActionsEnum.UPDATE_ORDER_REQUESTED:
      return {...state, isBusy: true};
    case ServicesActionsEnum.UPDATE_ORDER_SUCCESS:
      return {...state, isBusy: false};
    case ServicesActionsEnum.UPDATE_ORDER_FAILURE:
      return {...state, isBusy: false};

    // Update order
    case ServicesActionsEnum.DELETE_SERVICE_REQUESTED:
      return {...state, isDeleting: true};
    case ServicesActionsEnum.DELETE_SERVICE_SUCCESS:
      return {...state, isDeleting: false};
    case ServicesActionsEnum.DELETE_SERVICE_FAILURE:
      return {...state, isDeleting: false};

    // Update order
    case ServicesActionsEnum.UPDATE_SERVICE_REQUESTED:
      return {...state, isBusy: true};
    case ServicesActionsEnum.UPDATE_SERVICE_SUCCESS:
      return {...state, isBusy: false};
    case ServicesActionsEnum.UPDATE_SERVICE_FAILURE:
      return {...state, isBusy: false};

    // Update order
    case ServicesActionsEnum.UPDATE_AVATAR_REQUESTED:
      return {...state, isBusy: true};
    case ServicesActionsEnum.UPDATE_AVATAR_SUCCESS:
      return {...state, isBusy: false};
    case ServicesActionsEnum.UPDATE_AVATAR_FAILURE:
      return {...state, isBusy: false, showError: true, errorMessage: action.payload.displayMessage};

    // Adds new location
    case ServicesActionsEnum.ADD_SERVICE_REQUESTED:
      return {...state, isBusy: true};
    case ServicesActionsEnum.ADD_SERVICE_SUCCESS:
      return {...state, isBusy: false};
    case ServicesActionsEnum.ADD_SERVICE_FAILURE:
      return {...state, isBusy: false, showError: true, errorMessage: action.payload.displayMessage};

    // Utility
    case ServicesActionsEnum.SERVICE_SET_SELECTED_ITEM:
      return {...state, selectedItem: {...state.selectedItem, ...action.payload}}

    case ServicesActionsEnum.SERVICE_TOGGLE_SERVICE:
      return {...state, selectedItem: {...state.selectedItem, employees: [...insertOrRemove(state.selectedItem.employees, action.payload.id)]}}
      
    case ServicesActionsEnum.SERVICE_SET_ORDER:
      return {...state, data: [...action.payload]}
    case ServicesActionsEnum.SERVICE_CLEAR_ERROR:
      return {...state, showError: false, errorMessage: ""}
    case ServicesActionsEnum.SERVICE_CLEAR_STATE:
      return {...state, ...initialState}
    default:
      return state;
  }
}

export { ServiceReducer };
