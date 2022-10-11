import { Dispatch } from "redux";
import { IUserCredentials } from "../Types";
import { AppActionsEnum } from "./ReduxActions";

/**
 * App logout action
 */
export interface IAppLogoutAction {
  type: AppActionsEnum.APP_LOG_OUT_SUCCESS
}

/**
 * Sign out from application
 */
export const signOut = () => (dispatch: Dispatch) => dispatch({type: AppActionsEnum.APP_LOG_OUT_SUCCESS});

/**
 *  App login action
 */
export interface IAppLoginAction {
  payload: IUserCredentials
  type: AppActionsEnum.APP_LOG_IN_SUCCESS
}

/**
 * Sign in
 * @param credentials
 */
export const signIn = (credentials: IUserCredentials) => (dispatch: Dispatch) => dispatch({type: AppActionsEnum.APP_LOG_IN_SUCCESS, payload: credentials});

/**
 * Types
 */
export type AppActions = IAppLogoutAction | IAppLoginAction;