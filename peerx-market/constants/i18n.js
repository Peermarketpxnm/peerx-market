import { I18n } from "i18n-js";

import pt from "./locales/pt.json";
import en from "./locales/en.json";

import enUS from "i18n-js/json/en-US.json";
import ptBR from "i18n-js/json/pt-BR.json";

const i18n = new I18n({
  pt,
  en,
  ...ptBR,
  ...enUS,
});

i18n.store(en);
i18n.store(pt);

export default i18n;
