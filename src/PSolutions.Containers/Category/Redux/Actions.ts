import axios from "axios";
import { Dispatch } from "redux";
import { ICategory } from "../Types";
import { CategoryActionsEnum } from "./ReduxActions";
import * as CommonActions from "../../../PSolutions.Contracts/Actions";

/**
 *  Gets employees async
 */
export const getCategoriesAsync = (officeId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({type: CategoryActionsEnum.GET_CATEGORY_LIST_REQUESTED})
      const res = await axios.get<Array<ICategory>>(`Biz/ServiceCategory`, {params: {officeId}});
      dispatch({type: CategoryActionsEnum.GET_CATEGORY_LIST_SUCCESS, payload: res.data})
      return res.data;
    } catch (e: any) {
      dispatch({type: CategoryActionsEnum.GET_CATEGORY_LIST_FAILURE, payload: e?.displayMessage || "generic.messages.error"})
      return null;
    }
  }
}

/**
 *  Gets employee async
 */
export const getCategoryAsync = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({type: CategoryActionsEnum.GET_CATEGORY_REQUESTED})
      const res = await axios.get<ICategory>(`Biz/ServiceCategory/${id}`);
      dispatch({type: CategoryActionsEnum.GET_CATEGORY_FETCHED, payload: res.data})
      return res.data;
    } catch (e: any) {
      dispatch({type: CategoryActionsEnum.GET_CATEGORY_FAILURE, payload: e?.displayMessage || "generic.messages.error"})
      return null;
    }
  }
}

/**
 * Updates employee order
 * @param categories
 */
export const updateCategoryOrderAsync = (categories: Array<ICategory>) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({type: CategoryActionsEnum.UPDATE_ORDER_REQUESTED})
      const res = await axios.post("/Biz/ServiceCategory/UpdateOrder", categories);
      dispatch({type: CategoryActionsEnum.UPDATE_ORDER_SUCCESS, payload: res.data});
    } catch (e: any) {
      dispatch({type: CategoryActionsEnum.UPDATE_ORDER_FAILURE, payload: e?.displayMessage || "generic.messages.error"})
    }
  }
};

/**
 * Updates category
 * @param category
 */
export const updateCategoryAsync = (category: ICategory) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({type: CategoryActionsEnum.UPDATE_CATEGORY_REQUESTED})
      const res = await axios.put(`/Biz/ServiceCategory/${category.id}`, category);
      dispatch({type: CategoryActionsEnum.UPDATE_CATEGORY_SUCCESS, payload: res.data});
      return true;
    } catch (e: any) {
      dispatch({type: CategoryActionsEnum.UPDATE_CATEGORY_FAILURE, payload: e?.displayMessage || "generic.messages.error"})
      return false;
    }
  }
};

/**
 * Updates category
 * @param category
 */
export const addCategoryAsync = (category: ICategory) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({type: CategoryActionsEnum.ADD_CATEGORY_REQUESTED})
      const res = await axios.post("/Biz/ServiceCategory", category);
      dispatch({type: CategoryActionsEnum.ADD_CATEGORY_SUCCESS, payload: res.data});
      return true;
    } catch (e: any) {
      dispatch({type: CategoryActionsEnum.ADD_CATEGORY_FAILURE, payload: e?.displayMessage || "generic.messages.error"})
      return false;
    }
  }
};

/**
 * Clears state
 */
export const clearState = () => (dispatch: Dispatch) => dispatch({type: CategoryActionsEnum.CATEGORY_CLEAR_STATE});

/**
 * Clears error
 */
export const clearError = () => (dispatch: Dispatch) => dispatch({type: CategoryActionsEnum.CATEGORY_CLEAR_ERROR});

/**
 * Sets order
 * @param data
 */
export const setOrder = (data: Array<ICategory>) => (dispatch: Dispatch) => dispatch({type: CategoryActionsEnum.CATEGORY_SET_ORDER, payload: data});

/**
 * Sets selected employee
 * @param employee
 */
export const setSelectedItem = (employee: ICategory) => (dispatch: Dispatch) => dispatch({type: CategoryActionsEnum.CATEGORY_SET_SELECTED_ITEM, payload: employee});

/**
 * Toggles selected service
 * @param service
 */
export const toggleSelectedService = (service: ICategory) => (dispatch: Dispatch) => dispatch({type: CategoryActionsEnum.CATEGORY_TOGGLE_ITEM, payload: service});


/**
 * Location Action
 */
export type CategoryActions =
  CommonActions.IFailure |
  CommonActions.IRequested |
  CommonActions.IClearError |
  CommonActions.IClearState |
  CommonActions.IToggle<ICategory> |
  CommonActions.IDetails<ICategory> |
  CommonActions.ISetItem<ICategory> |
  CommonActions.ISetOrder<ICategory> |
  CommonActions.ISuccess<Array<ICategory>>;
