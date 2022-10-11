import { Dispatch } from "redux";
import { ILocation } from "../../Locations/Types";
import { CurrentLocationActionsEnum } from "./ReduxActions";

/**
 *  Sets current location
 */
export interface ISetLocationAction {
  payload: ILocation,
  type: CurrentLocationActionsEnum.SET_CURRENT_LOCATION,
}

/**
 *  Removes current location
 */
export interface IRemoveLocationAction {
  type: CurrentLocationActionsEnum.REMOVE_CURRENT_LOCATION,
}

/**
 *  Sets current location
 */
export const removeCurrentLocation = () => (dispatch: Dispatch) => dispatch({type: CurrentLocationActionsEnum.REMOVE_CURRENT_LOCATION});

/**
 * Removes current location
 * @param location
 */
export const setCurrentLocation = (location: ILocation) => (dispatch: Dispatch) => dispatch({type: CurrentLocationActionsEnum.SET_CURRENT_LOCATION, payload: location});


/**
 * Current location actions
 */
export type CurrentLocationActions = ISetLocationAction | IRemoveLocationAction;