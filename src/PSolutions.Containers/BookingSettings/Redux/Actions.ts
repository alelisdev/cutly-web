import axios from "axios";
import { Dispatch } from "redux";
import { BookingSettingsActionsEnum } from "./ReduxActions";
import { IBookingSettings, IBookingSettingsRequest } from "../Types";
import * as CommonActions from "../../../PSolutions.Contracts/Actions";

/**
 *  Gets location async
 */
export const getBookingSettingsAsync = (officeId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({type: BookingSettingsActionsEnum.GET_BOOKING_SETTINGS_REQUESTED})
      const res = await axios.get<IBookingSettings>(`Biz/BookingSettings/${officeId}`);
      dispatch({type: BookingSettingsActionsEnum.GET_BOOKING_SETTINGS_SUCCESS, payload: res.data})
      return res.data;
    } catch (e: any) {
      dispatch({type: BookingSettingsActionsEnum.GET_BOOKING_SETTINGS_FAILURE, payload: e?.displayMessage || "generic.messages.error"})
      return null;
    }
  }
}


/**
 * Adds new location async
 * @param request
 */
export const updateBookingSettingsAsync = (request: IBookingSettingsRequest) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({type: BookingSettingsActionsEnum.UPDATE_BOOKING_SETTINGS_REQUESTED})
      const res = await axios.post("Biz/BookingSettings", request);
      dispatch({type: BookingSettingsActionsEnum.UPDATE_BOOKING_SETTINGS_SUCCESS, payload: res.data})
      return true;
    } catch (e: any) {
      dispatch({type: BookingSettingsActionsEnum.UPDATE_BOOKING_SETTINGS_FAILURE, payload: e?.displayMessage || "generic.messages.error"})
      return false;
    }
  }
}

/**
 * Clears state
 */
export const clearState = () => (dispatch: Dispatch) => dispatch({type: BookingSettingsActionsEnum.BOOKING_SETTINGS_CLEAR_STATE});

/**
 * Clears error
 */
export const clearError = () => (dispatch: Dispatch) => dispatch({type: BookingSettingsActionsEnum.BOOKING_SETTINGS_CLEAR_ERROR});

/**
 * Location Action
 */
export type BookingSettingsActions = CommonActions.ISuccess<IBookingSettings> | CommonActions.IFailure | CommonActions.IRequested | CommonActions.IClearError | CommonActions.IClearState;