/**
 * Requested data type
 */
import { ErrorResponse } from "../Errors";

/**
 * Requested
 */
export interface IRequested {
  type: `${string}_REQUESTED`
}

/**
 *  Success data type
 */
export interface ISuccess<DataType> {
  payload: DataType,
  type: `${string}_SUCCESS`
}

/**
 * Get details
 */
export interface IDetails<DataType> {
  payload: DataType,
  type: `${string}_FETCHED`
}


/**
 *  Failure data type
 */
export interface IFailure {
  payload: ErrorResponse,
  type: `${string}_FAILURE`
}

/**
 *  Clear state
 */
export interface IClearState {
  type: `${string}_CLEAR_STATE`;
}

/**
 *  Clear error
 */
export interface IClearError {
  type: `${string}_CLEAR_ERROR`;
}

/**
 * Set order
 */
export interface ISetOrder<DataType> {
  type: `${string}_SET_ORDER`,
  payload: Array<DataType>,
}

/**
 * Set selected item
 */
export interface ISetItem<DataType> {
  type: `${string}_SET_SELECTED_ITEM`,
  payload: DataType,
}

/**
 *  Toggles data
 */
export interface IToggle<DataType> {
  type: `${string}_TOGGLE_ITEM`,
  payload: DataType,
}