import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import * as Sentry from "@sentry/react";
import { store } from "./PSolutions.Store/DashboardStore";
import Application from "./PSolutions.App/Container/Application";
import { SentryOptions } from "./PSolutions.Config/SentryConfiguration";
import './index.css';
import './PSolutions.Init/InitializeIcons';
import './PSolutions.Config/AxiosConfiguration';

import "react-virtualized/styles.css";
import 'simplebar/dist/simplebar.min.css';
import 'react-advanced-cropper/dist/style.css';
import "react-datepicker/dist/react-datepicker.css";

Sentry.init(SentryOptions);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Application/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('main')
);

