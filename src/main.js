import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

import swal2Plugin from "./plugins/swal2Plugin";
// import 'sweetalert2/dist/sweetalert2.min.css'

import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
// import { Quasar } from "quasar";
// import quasarUserOptions from "./quasar-user-options";
// import iconSet from "quasar/icon-set/fontawesome-v5";
import store from "../store";
const app = createApp(App).use(Quasar, quasarUserOptions);

app.config.globalProperties.$sharePointUrl =
  process.env.NODE_ENV == "production"
    ? "https://portal.army.idf/sites/hafifon383/_api/web/Lists/"
    : "http://localhost:3000/";
app.config.globalProperties.$isSharePointUrl =
  process.env.NODE_ENV == "production";

(app.config.globalProperties.$asyncParse = function (str) {
  return new Promise((resolve) => {
    resolve(JSON.parse(str));
  });
}),
  (app.config.globalProperties.$asyncGetToken = function () {
    return axios
      .post("https://portal.army.idf/sites/hafifon383/_api/contextinfo")
      .then((res) => res.data.FormDigestValue);
  }),
  (app.config.globalProperties.$parseTestsNames = function (key) {
    return new Promise((resolve, reject) => {
      const data = localStorage.getItem(key);

      if (data !== "undefined") {
        try {
          const parsedData = JSON.parse(data);
          resolve(parsedData);
        } catch (error) {
          reject(error);
        }
      } else {
        resolve([]);
      }
    });
  });

app.use(router);
app.use(store);
app.use(swal2Plugin);
app.mount("#app");
