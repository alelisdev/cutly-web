import React from 'react';
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from "react-avatar";
import { bindActionCreators, Dispatch } from "redux";
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from "redux-persist/integration/react";
import { IRootState } from "../../PSolutions.State";
import enTranslation from "../../PSolutions.Intl/en.json";
import bsTranslation from "../../PSolutions.Intl/bs.json";
import { persistor } from "../../PSolutions.Store/DashboardStore";
import { AdminDashboard } from "../../PSolutions.Pages/AdminDashboard";
import { GuestDashboard } from "../../PSolutions.Pages/GuestDashboard";
import validationMessages from "../../PSolutions.Intl/validation-en.json";
import { AVATAR_COLORS } from "../../PSolutions.Config/ApplicationDefaults";
import { TranslationProvider } from "../../PSolutions.Providers/Translation/TranslationProvider";

interface Props {
  currentLanguage: string;
  isAuthenticated: boolean;
}

const translations: any = {
  en: {
    ...enTranslation,
    ...validationMessages
  },
  bs: {
    ...bsTranslation,
    ...validationMessages
  }
}

class AdminApplication extends React.PureComponent<Props> {
  render() {
    const {isAuthenticated, currentLanguage} = this.props;
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <PersistGate persistor={persistor}>
          <ConfigProvider colors={AVATAR_COLORS}>
            <TranslationProvider currentLanguage={currentLanguage}>
              <IntlProvider locale={currentLanguage} defaultLocale={currentLanguage} messages={translations[currentLanguage]}>
                <AdminDashboard show={isAuthenticated}/>
                <GuestDashboard show={!isAuthenticated}/>
              </IntlProvider>
            </TranslationProvider>
          </ConfigProvider>
        </PersistGate>
      </Router>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    currentLanguage: state.app.currentLanguage,
    isAuthenticated: state.app.isAuthenticated,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminApplication);
