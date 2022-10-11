import axios from "axios";
import axiosRetry from "axios-retry";
import { AuthorizationHeaders } from "../PSolutions.Http/HttpInterceptors";

if (process.env.NODE_ENV !== "production") axios.defaults.baseURL = "https://psolutions-tekica.azurewebsites.net/api";
if (process.env.NODE_ENV == "production") axios.defaults.baseURL = "https://psolutions-tekica-production.azurewebsites.net/api";

/**
 * Axios retry
 */
axios.interceptors.request.use(AuthorizationHeaders)
axiosRetry(axios, {retries: 5, retryDelay: axiosRetry.exponentialDelay, retryCondition: axiosRetry.isNetworkError})
