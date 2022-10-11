import React from "react";
import bsLocale from 'date-fns/locale/bs'
import croLocale from "date-fns/locale/hr";
import sloLocale from "date-fns/locale/sl";
import enLocale from "date-fns/locale/en-US";
import srLatLocale from "date-fns/locale/sr-Latn";
import { IAppTranslation } from "../Types";
import { DEFAULT_LANG } from "../../PSolutions.Config/ApplicationDefaults";


export function getTranslationContextLocale(lang: string) {
  switch (lang) {
    case "bs":
      return bsLocale;
    case "hr":
      return croLocale;
    case 'sl':
      return sloLocale;
    case 'sr':
      return srLatLocale;
    case 'en':
      return enLocale;
    default:
      return croLocale;
  }
}

const defaultValues: IAppTranslation = {
  currentLanguage: DEFAULT_LANG,
  currentLocale: getTranslationContextLocale(DEFAULT_LANG),
}

export const TranslationContext = React.createContext(defaultValues);