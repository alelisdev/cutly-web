import { AxiosRequestConfig } from "axios";
import { store } from "../PSolutions.Store/DashboardStore";

/**
 *  Applies authorization
 * @param config
 * @constructor
 */
export function AuthorizationHeaders(config: AxiosRequestConfig) {
  if (!config.headers) config.headers = {};
  config.headers["Accept-Language"] = store.getState().app.currentLanguage;
  config.headers["Authorization"] = `Bearer ${store.getState().app.accessToken}`;
  return config;
}
