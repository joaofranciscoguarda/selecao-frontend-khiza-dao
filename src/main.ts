import {
  createApp,
  Component,
  toRefs,
} from "vue";
import App from "./App.vue";

import { aliases, fa } from "vuetify/iconsets/fa";

import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createPinia } from "pinia";
import Vue3Toastify, {
  type ToastContainerOptions,
} from "vue3-toastify";

import * as VueI18n from "vue-i18n";
import messages from "./translations/translations";

const i18n = VueI18n.createI18n({
  locale: localStorage.getItem(
    "@khiza:user-locale"
  ) as string,
  fallbackLocale: "en",
  messages,
});

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "fa",
    aliases,
    sets: {
      fa,
    },
  },
});

createApp(App)
  .use(createPinia())
  .use(i18n)
  .use(vuetify)
  .use(Vue3Toastify, {
    autoClose: 3000,
    style: {
      opacity: "1",
      userSelect: "initial",
    },
  } as ToastContainerOptions)
  .component("Datepicker", Datepicker)
  .mount("#app");
