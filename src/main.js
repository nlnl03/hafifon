import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import iconSet from "quasar/icon-set/fontawesome-v5";

const app = createApp(App).use(Quasar, quasarUserOptions,{
  iconSet: iconSet
});

app.config.globalProperties.$sharePointUrl =
  process.env.NODE_ENV == "production"
    ? "https://portal.army.idf/sites/hafifon383/_api/web/Lists/"
    : "http://localhost:3000/";
app.config.globalProperties.$isSharePointUrl =
  process.env.NODE_ENV == "production";
app.config.globalProperties.$getHebLetters = function(index) {
  const hebrewLetters = [
    "א",
    "ב",
    "ג",
    "ד",
    "ה",
    "ו",
    "ז",
    "ח",
    "ט",
    "י",
    "כ",
    "ל",
    "מ",
    "נ",
    "ס",
    "ע",
    "פ",
    "צ",
    "ק",
    "ר",
    "ש",
    "ת"
  ];
  return hebrewLetters[index % hebrewLetters.length];
};
(app.config.globalProperties.$asyncParse = function(str) {
  return new Promise((resolve) => {
    resolve(JSON.parse(str));
  });
}),

app.config.globalProperties.$asyncGetToken = function(){
  return axios.post("https://portal.army.idf/sites/hafifon383/_api/contextinfo").then(res=>res.data.FormDigestValue)
},
  app.use(router);
app.use(VueSweetalert2);
app.mount("#app");
