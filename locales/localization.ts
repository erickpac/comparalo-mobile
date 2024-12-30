import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import { translations } from "@/locales/translations";

export const i18n = new I18n(translations);

i18n.locale = getLocales()[0].languageCode ?? "en";
i18n.enableFallback = true;

export const setLocale = (locale: string) => {
  i18n.locale = locale;
};
