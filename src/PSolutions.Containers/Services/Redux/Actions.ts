import axios from "axios";
import { Dispatch } from "redux";
import { IService } from "../Types";
import { IEmployee } from "../../Employees/Types";
import { ServicesActionsEnum } from "./ReduxActions";
import * as CommonActions from "../../../PSolutions.Contracts/Actions";
import { API_MINIMUM_DELAY } from "../../../PSolutions.Config/ApplicationDefaults";

/**
 * Get service
 * @param serviceId
 */
export const getServiceAsync = (serviceId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({type: ServicesActionsEnum.GET_SERVICE_REQUESTED})
      const res = await axios.get(`/Biz/OfficeServices/${serviceId}`);
      setTimeout(() => dispatch({type: ServicesActionsEnum.GET_SERVICE_FETCHED, payload: res.data}), API_MINIMUM_DELAY);
    } catch (e: any) {
      setTimeout(() => dispatch({type: ServicesActionsEnum.GET_SERVICE_FAILURE, payload: e?.displayMessage || "generic.messages.error"}), API_MINIMUM_DELAY)
    }
  }
};

/**
 * Updates service photo
 * @param serviceId
 * @param base64
 */
 export const uploadServiceAvatarAsync = (serviceId: number, base64: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({type: ServicesActionsEnum.UPDATE_AVATAR_REQUESTED})
      const response = await axios.put(`/Biz/OfficeServices/CoverImage/${serviceId}`, {imageBase64: base64});
      dispatch({type: ServicesActionsEnum.UPDATE_AVATAR_SUCCESS});
      return response.data;
    } catch (e: any) {
      dispatch({type: ServicesActionsEnum.UPDATE_AVATAR_FAILURE, payload: e?.displayMessage || "generic.messages.error"});
      return null;
    }
  }
};


/**
 * Updates services order
 * @param services
 */
export const updateServicesOrderAndCategoryAsync = (services: Array<IService>) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({type: ServicesActionsEnum.UPDATE_ORDER_REQUESTED})
      const res = await axios.post("/Biz/OfficeServices/UpdateOrderAndCategory", services);
      setTimeout(() => dispatch({type: ServicesActionsEnum.UPDATE_ORDER_SUCCESS, payload: res.data}), API_MINIMUM_DELAY);
    } catch (e: any) {
      setTimeout(() => dispatch({type: ServicesActionsEnum.UPDATE_ORDER_FAILURE, payload: e?.displayMessage || "generic.messages.error"}), API_MINIMUM_DELAY)
    }
  }
};

/**
 * Updates services order
 * @param services
 */
export const updateServicesOrderAsync = (services: Array<IService>) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({type: ServicesActionsEnum.UPDATE_ORDER_REQUESTED})
      const res = await axios.post("/Biz/OfficeServices/UpdateOrder", services);
      setTimeout(() => dispatch({type: ServicesActionsEnum.UPDATE_ORDER_SUCCESS, payload: res.data}), API_MINIMUM_DELAY);
    } catch (e: any) {
      setTimeout(() => dispatch({type: ServicesActionsEnum.UPDATE_ORDER_FAILURE, payload: e?.displayMessage || "generic.messages.error"}), API_MINIMUM_DELAY)
    }
  }
};

/**
 * Add new service
 * @param service
 */
export const addServiceAsync = (service: IService) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({type: ServicesActionsEnum.ADD_SERVICE_REQUESTED})
      const res = await axios.post("/Biz/OfficeServices", service);
      setTimeout(() => dispatch({type: ServicesActionsEnum.ADD_SERVICE_SUCCESS, payload: res.data}), API_MINIMUM_DELAY);
      return true;
    } catch (e: any) {
      setTimeout(() => dispatch({type: ServicesActionsEnum.ADD_SERVICE_FAILURE, payload: e?.displayMessage || "generic.messages.error"}), API_MINIMUM_DELAY)
      return false;
    }
  }
};


/**
 *  Gets services async
 */
export const getServicesAsync = (officeId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const params = {officeId};
      dispatch({type: ServicesActionsEnum.GET_SERVICE_LIST_REQUESTED})
      const res = await axios.get<Array<IService>>('Biz/OfficeServices/GetServices', {params});
      dispatch({type: ServicesActionsEnum.GET_SERVICE_LIST_SUCCESS, payload: res.data})
      return res.data;
    } catch (e: any) {
      dispatch({type: ServicesActionsEnum.GET_SERVICE_LIST_FAILURE, payload: e?.displayMessage || "generic.messages.error"})
      return null;
    }
  }
}

/**
 * Updates service
 * @param service
 */
export const updateServiceAsync = (service: IService) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({type: ServicesActionsEnum.UPDATE_SERVICE_REQUESTED})
      const res = await axios.put(`/Biz/OfficeServices/${service.id}`, service);
      dispatch({type: ServicesActionsEnum.UPDATE_SERVICE_SUCCESS, payload: res.data});
      return true;
    } catch (e: any) {
      dispatch({type: ServicesActionsEnum.UPDATE_SERVICE_FAILURE, payload: e?.displayMessage || "generic.messages.error"})
      return false;
    }
  }
};

/**
 * deletes service
 * @param serviceId
 */
export const deleteServiceAsync = (serviceId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({type: ServicesActionsEnum.DELETE_SERVICE_REQUESTED})
      const res = await axios.delete(`/Biz/OfficeServices/${serviceId}`);
      setTimeout(() => dispatch({type: ServicesActionsEnum.DELETE_SERVICE_SUCCESS, payload: res.data}), API_MINIMUM_DELAY);
      return true;
    } catch (e: any) {
      setTimeout(() => dispatch({type: ServicesActionsEnum.DELETE_SERVICE_FAILURE, payload: e?.displayMessage || "generic.messages.error"}), API_MINIMUM_DELAY);
      return false;
    }
  }
};

/**
 * Clears state
 */
export const clearState = () => (dispatch: Dispatch) => dispatch({type: ServicesActionsEnum.SERVICE_CLEAR_STATE});

/**
 * Clears error
 */
export const clearError = () => (dispatch: Dispatch) => dispatch({type: ServicesActionsEnum.SERVICE_CLEAR_ERROR});

/**
 * Sets order
 * @param data
 */
export const setOrder = (data: Array<IService>) => (dispatch: Dispatch) => dispatch({type: ServicesActionsEnum.SERVICE_SET_ORDER, payload: data});

/**
 * Sets selected employee
 * @param service
 */
export const setSelectedItem = (service: IService) => (dispatch: Dispatch) => dispatch({type: ServicesActionsEnum.SERVICE_SET_SELECTED_ITEM, payload: service});

/**
 * Toggles selected employee
 * @param employee
 */
 export const toggleSelectedEmployee = (employee: IEmployee) => (dispatch: Dispatch) => dispatch({type: ServicesActionsEnum.SERVICE_TOGGLE_SERVICE, payload: employee});


/**
 * Service Action
 */
export type ServiceActions =
  CommonActions.IFailure |
  CommonActions.IRequested |
  CommonActions.IClearError |
  CommonActions.IClearState |
  CommonActions.IToggle<IEmployee> |
  CommonActions.IDetails<IService> |
  CommonActions.ISetItem<IService> |
  CommonActions.ISetOrder<IService> |
  CommonActions.ISuccess<Array<IService>>;
