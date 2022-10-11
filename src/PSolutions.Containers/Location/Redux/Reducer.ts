import { Reducer } from "redux";
import { CurrentLocationActions } from "./Actions";
import { ICurrentLocationProps } from "../Types";
import { ILocation } from "../../Locations/Types";
import { CurrentLocationActionsEnum } from './ReduxActions';

/**
 *  Initial state
 */
const initialState: ICurrentLocationProps = {locationId: 0, location: {} as ILocation}

/**
 * Current location reducer
 * @param state
 * @param action
 * @constructor
 */
const CurrentLocationReducer: Reducer<ICurrentLocationProps, CurrentLocationActions> = (state: ICurrentLocationProps = initialState, action: CurrentLocationActions) => {
  switch (action.type) {
    case CurrentLocationActionsEnum.REMOVE_CURRENT_LOCATION:
      return {...state, locationId: 0, location: {} as ILocation}
    case CurrentLocationActionsEnum.SET_CURRENT_LOCATION:
      return {...state, location: action.payload, locationId: action.payload.providerId};
    default:
      return state;
  }
}

export { CurrentLocationReducer }