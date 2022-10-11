import { Reducer } from "redux";
import { LocationActions } from "./Actions";
import { LocationActionsEnum } from "./ReduxActions";
import { ILocation, ILocationProps, ILocationRequest } from "../Types";

const initialState: ILocationProps = {
  data: [],
  page: 1,
  nextPage: 1,
  isBusy: false,
  pageSize: 25,
  totalCount: 0,
  hasMore: false,
  errorMessage: "",
  showError: false,
  selectedItem: {} as ILocation,
  locationRequest: {
    name: "",
    city: "",
    street: "",
    country: "",
    zipCode: "",
    phoneNumber: "",
    streetNumber: "",
  } as ILocationRequest,
};

const LocationReducer: Reducer<ILocationProps, LocationActions> = (state: ILocationProps = initialState, action: LocationActions) => {
  switch (action.type) {
    // Gets locations
    case LocationActionsEnum.GET_LOCATION_LIST_REQUESTED:
      return {...state, isBusy: true};
    case LocationActionsEnum.GET_LOCATION_LIST_SUCCESS:
      return {...state, isBusy: false, data: action.payload};
    case LocationActionsEnum.GET_LOCATION_LIST_FAILURE:
      return {...state, isBusy: false, showError: true, errorMessage: action.payload.displayMessage};

    // Adds new location
    case LocationActionsEnum.ADD_LOCATION_REQUESTED:
      return {...state, isBusy: true};
    case LocationActionsEnum.ADD_LOCATION_SUCCESS:
      return {...state, isBusy: false};
    case LocationActionsEnum.ADD_LOCATION_FAILURE:
      return {...state, isBusy: false, showError: true, errorMessage: action.payload.displayMessage};

    // Utility
    case LocationActionsEnum.LOCATION_CLEAR_ERROR:
      return {...state, showError: false, errorMessage: ""}
    case LocationActionsEnum.LOCATION_CLEAR_STATE:
      return {...state, ...initialState}
    default:
      return state;
  }
}

export { LocationReducer };