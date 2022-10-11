import { Reducer } from "redux";
import { EmployeeActions } from "./Actions";
import { EmployeeActionsEnum } from "./ReduxActions";
import { IEmployee, IEmployeeProps } from "../Types";
import { insertOrRemove } from "../../../PSolutions.Utility/ArrayUtilities";

const initialState: IEmployeeProps = {
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
    title: "",
    email: "",
    services: [],
    lastName: "",
    firstName: "",
    phoneNumber: "",
    profilePhoto: "",
    branchOfficeId: 0,
    orderingNumber: 0,
    canOnlineBook: false,
    customServiceOptions: [],
    employeePauseRules: [],
    fridayEndTime: "",
    fridayStartTime: "",
    isFridayWorking: false,
    isMondayWorking: false,
    isSaturdayWorking: false,
    isSundayWorking: false,
    isThursdayWorking: false,
    isTuesdayWorking: false,
    isWednesdayWorking: false,
    mondayEndTime: "",
    mondayStartTime: "",
    thursdayEndTime: "",
    thursdayStartTime: "",
    tuesdayEndTime: "",
    tuesdayStartTime: "",
    wednesdayEndTime: "",
    wednesdayStartTime: "",
  } as IEmployee
};

const EmployeeReducer: Reducer<IEmployeeProps, EmployeeActions> = (state: IEmployeeProps = initialState, action: EmployeeActions) => {
  switch (action.type) {
    // Gets locations
    case EmployeeActionsEnum.GET_EMPLOYEE_LIST_REQUESTED:
      return {...state, isBusy: true};
    case EmployeeActionsEnum.GET_EMPLOYEE_LIST_SUCCESS:
      return {...state, isBusy: false, data: action.payload};
    case EmployeeActionsEnum.GET_EMPLOYEE_LIST_FAILURE:
      return {...state, isBusy: false, showError: true, errorMessage: action.payload.displayMessage};

    case EmployeeActionsEnum.GET_EMPLOYEE_REQUESTED:
      return {...state, isBusy: true}
    case EmployeeActionsEnum.GET_EMPLOYEE_FETCHED:
      return {...state, isBusy: false, selectedItem: action.payload}
    case EmployeeActionsEnum.GET_EMPLOYEE_FAILURE:
      return {...state, isBusy: false, showError: true, errorMessage: action.payload.displayMessage};

    // Update order
    case EmployeeActionsEnum.UPDATE_ORDER_REQUESTED:
      return {...state, isBusy: true};
    case EmployeeActionsEnum.UPDATE_ORDER_SUCCESS:
      return {...state, isBusy: false};
    case EmployeeActionsEnum.UPDATE_ORDER_FAILURE:
      return {...state, isBusy: false};

    // Update order
    case EmployeeActionsEnum.UPDATE_EMPLOYEE_REQUESTED:
      return {...state, isBusy: true};
    case EmployeeActionsEnum.UPDATE_EMPLOYEE_SUCCESS:
      return {...state, isBusy: false};
    case EmployeeActionsEnum.UPDATE_EMPLOYEE_FAILURE:
      return {...state, isBusy: false};

    // Update order
    case EmployeeActionsEnum.UPDATE_AVATAR_REQUESTED:
      return {...state, isBusy: true};
    case EmployeeActionsEnum.UPDATE_AVATAR_SUCCESS:
      return {...state, isBusy: false};
    case EmployeeActionsEnum.UPDATE_AVATAR_FAILURE:
      return {...state, isBusy: false, showError: true, errorMessage: action.payload.displayMessage};

    // Adds new location
    case EmployeeActionsEnum.ADD_EMPLOYEE_REQUESTED:
      return {...state, isBusy: true};
    case EmployeeActionsEnum.ADD_EMPLOYEE_SUCCESS:
      return {...state, isBusy: false};
    case EmployeeActionsEnum.ADD_EMPLOYEE_FAILURE:
      return {...state, isBusy: false, showError: true, errorMessage: action.payload.displayMessage};

    // Utility
    case EmployeeActionsEnum.EMPLOYEE_TOGGLE_SERVICE:
      return {...state, selectedItem: {...state.selectedItem, services: [...insertOrRemove(state.selectedItem.services, action.payload.id)]}}
    case EmployeeActionsEnum.EMPLOYEE_SET_SELECTED_ITEM:
      return {...state, selectedItem: {...state.selectedItem, id: action.payload.id}}
    case EmployeeActionsEnum.EMPLOYEE_SET_ORDER:
      return {...state, data: [...action.payload]}

    case EmployeeActionsEnum.EMPLOYEE_CLEAR_ERROR:
      return {...state, showError: false, errorMessage: ""}
    case EmployeeActionsEnum.EMPLOYEE_CLEAR_STATE:
      return {...state, ...initialState}
    default:
      return state;
  }
}

export { EmployeeReducer };