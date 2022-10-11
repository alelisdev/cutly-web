import axios from "axios";
import { Dispatch } from "redux";
import { ILocation, ILocationRequest } from "../Types";
import { LocationActionsEnum } from "./ReduxActions";
import * as CommonActions from "../../../PSolutions.Contracts/Actions";

/**
 *  Gets location async
 */
export const getLocationsAsync = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({type: LocationActionsEnum.GET_LOCATION_LIST_REQUESTED})
      const res = await axios.get<Array<ILocation>>("Biz/BusinessAccount/GetAccountProviders");
      dispatch({type: LocationActionsEnum.GET_LOCATION_LIST_SUCCESS, payload: res.data})
      return res.data;
    } catch (e: any) {
      dispatch({type: LocationActionsEnum.GET_LOCATION_LIST_FAILURE, payload: e?.displayMessage || "generic.messages.error"})
      return null;
    }
  }
}

/**
 * Adds new location async
 * @param request
 */
export const addNewLocationAsync = (request: ILocationRequest) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({type: LocationActionsEnum.ADD_LOCATION_REQUESTED})
      const res = await axios.post("Biz/BranchOffice/AddBranchOffice", request);
      dispatch({type: LocationActionsEnum.ADD_LOCATION_SUCCESS, payload: res.data})
      return true;
    } catch (e: any) {
      dispatch({type: LocationActionsEnum.ADD_LOCATION_FAILURE, payload: e?.displayMessage || "generic.messages.error"})
      return false;
    }
  }
}

/**
 * Clears state
 */
export const clearState = () => (dispatch: Dispatch) => dispatch({type: LocationActionsEnum.LOCATION_CLEAR_STATE});

/**
 * Clears error
 */
export const clearError = () => (dispatch: Dispatch) => dispatch({type: LocationActionsEnum.LOCATION_CLEAR_ERROR});

/**
 * Location Action
 */
export type LocationActions = CommonActions.ISuccess<Array<ILocation>> | CommonActions.IFailure | CommonActions.IRequested | CommonActions.IClearError | CommonActions.IClearState;