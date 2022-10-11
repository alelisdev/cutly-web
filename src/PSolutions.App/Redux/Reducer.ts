import { Reducer } from "redux";
import { AppActions } from "./Actions";
import { IApplicationProps } from "../Types";
import { AppActionsEnum } from "./ReduxActions";
import { DEFAULT_LANG } from "../../PSolutions.Config/ApplicationDefaults";

const initialState: IApplicationProps = {
  email: "",
  lastName: "",
  firstName: "",
  accessToken: "",
  profilePhoto: "",
  isAuthenticated: false,
  currentLanguage: DEFAULT_LANG,
}

const AppReducer: Reducer<IApplicationProps, AppActions> = (state: IApplicationProps = initialState, action: AppActions) => {
  switch (action.type) {
    case AppActionsEnum.APP_LOG_IN_SUCCESS:
      return {...state, ...action.payload, isAuthenticated: true}
    case AppActionsEnum.APP_LOG_OUT_SUCCESS:
      return {...state, ...initialState, currentLanguage: state.currentLanguage};
    default:
      return state;
  }
}

export { AppReducer };