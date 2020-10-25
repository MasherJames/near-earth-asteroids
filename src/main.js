import { createApp } from "vue";
import { createStore } from "vuex";

import { firebase } from "./firebase";
import "./firebase";
import "firebase/auth";

import App from "./App.vue";
import router from "./router";
import modules from "./store";

const store = createStore({ modules });

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .mount("#app");
  }
});
