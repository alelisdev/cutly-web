import React from "react";
import { IAppTranslation } from "../Types";
import { DEFAULT_LANG } from "../../PSolutions.Config/ApplicationDefaults";
import { getTranslationContextLocale, TranslationContext } from "./TranslationContext";

interface Props {
  currentLanguage: string | null;
}

export class TranslationProvider extends React.PureComponent<Props> {
  render() {
    const lng = this.props?.currentLanguage || DEFAULT_LANG;
    const values: IAppTranslation = {currentLanguage: lng, currentLocale: getTranslationContextLocale(lng)};
    return <TranslationContext.Provider value={values}> {this.props.children}</TranslationContext.Provider>;
  }
}