import axios from "axios";
import { Dispatch } from "redux";
import { IEmployee } from "../Types";
import { IService } from "../../Services/Types";
import { EmployeeActionsEnum } from "./ReduxActions";
import * as CommonActions from "../../../PSolutions.Contracts/Actions";

/**
 *  Gets employees async
 */
export const getClientsAsync = (locationId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({type: EmployeeActionsEnum.GET_EMPLOYEE_LIST_REQUESTED})
      const res = await axios.get<Array<IEmployee>>(`Biz/Client/GetClients/${locationId}`);
      dispatch({type: EmployeeActionsEnum.GET_EMPLOYEE_LIST_SUCCESS, payload: res.data})
      return res.data;
    } catch (e: any) {
      dispatch({type: EmployeeActionsEnum.GET_EMPLOYEE_LIST_FAILURE, payload: e?.displayMessage || "generic.messages.error"})
      return null;
    }
  }
}

/**
 *  Gets employee async
 */
export const getEmployeeAsync = (employeeId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({type: EmployeeActionsEnum.GET_EMPLOYEE_REQUESTED})
      const res = await axios.get<IEmployee>(`Biz/Employee/${employeeId}`);
      dispatch({type: EmployeeActionsEnum.GET_EMPLOYEE_FETCHED, payload: res.data})
      return res.data;
    } catch (e: any) {
      dispatch({type: EmployeeActionsEnum.GET_EMPLOYEE_FAILURE, payload: e?.displayMessage || "generic.messages.error"})
      return null;
    }
  }
}

/**
 * Updates employee order
 * @param employees
 */
export const updateEmployeeOrderAsync = (employees: Array<IEmployee>) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({type: EmployeeActionsEnum.UPDATE_ORDER_REQUESTED})
      const res = await axios.post("/Biz/Employee/UpdateOrder", employees);
      dispatch({type: EmployeeActionsEnum.UPDATE_ORDER_SUCCESS, payload: res.data});
    } catch (e: any) {
      dispatch({type: EmployeeActionsEnum.UPDATE_ORDER_FAILURE, payload: e?.displayMessage || "generic.messages.error"})
    }
  }
};

/**
 * Updates employee
 * @param employee
 */
export const updateEmployeeAsync = (employee: IEmployee) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({type: EmployeeActionsEnum.UPDATE_EMPLOYEE_REQUESTED})
      const res = await axios.put(`/Biz/Employee/${employee.id}`, employee);
      dispatch({type: EmployeeActionsEnum.UPDATE_EMPLOYEE_SUCCESS, payload: res.data});
      return true;
    } catch (e: any) {
      dispatch({type: EmployeeActionsEnum.UPDATE_EMPLOYEE_FAILURE, payload: e?.displayMessage || "generic.messages.error"})
      return false;
    }
  }
};

/**
 * Updates employee photo
 * @param employeeId
 * @param base64
 */
export const uploadEmployeeAvatarAsync = (employeeId: number, base64: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({type: EmployeeActionsEnum.UPDATE_AVATAR_REQUESTED})
      const response = await axios.put(`/Biz/Employee/CoverImage/${employeeId}`, {imageBase64: base64});
      dispatch({type: EmployeeActionsEnum.UPDATE_AVATAR_SUCCESS});
      return response.data;
    } catch (e: any) {
      dispatch({type: EmployeeActionsEnum.UPDATE_AVATAR_FAILURE, payload: e?.displayMessage || "generic.messages.error"});
      return null;
    }
  }
};

/**
 * Clears state
 */
export const clearState = () => (dispatch: Dispatch) => dispatch({type: EmployeeActionsEnum.EMPLOYEE_CLEAR_STATE});

/**
 * Clears error
 */
export const clearError = () => (dispatch: Dispatch) => dispatch({type: EmployeeActionsEnum.EMPLOYEE_CLEAR_STATE});

/**
 * Sets order
 * @param data
 */
export const setOrder = (data: Array<IEmployee>) => (dispatch: Dispatch) => dispatch({type: EmployeeActionsEnum.EMPLOYEE_SET_ORDER, payload: data});

/**
 * Sets selected employee
 * @param employee
 */
export const setSelectedItem = (employee: IEmployee) => (dispatch: Dispatch) => dispatch({type: EmployeeActionsEnum.EMPLOYEE_SET_SELECTED_ITEM, payload: employee});

/**
 * Toggles selected service
 * @param service
 */
export const toggleSelectedService = (service: IService) => (dispatch: Dispatch) => dispatch({type: EmployeeActionsEnum.EMPLOYEE_TOGGLE_SERVICE, payload: service});


/**
 * Location Action
 */
export type EmployeeActions =
  CommonActions.IFailure |
  CommonActions.IRequested |
  CommonActions.IClearError |
  CommonActions.IClearState |
  CommonActions.IToggle<IService> |
  CommonActions.IDetails<IEmployee> |
  CommonActions.ISetItem<IEmployee> |
  CommonActions.ISetOrder<IEmployee> |
  CommonActions.ISuccess<Array<IEmployee>>;
