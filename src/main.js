import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/scss/style.scss";

Vue.config.productionTip = false;
import VueMaterial from "vue-material";

import "./assets/scss/material-dashboard.scss";
import "vue-material/dist/vue-material.min.css";

Vue.use(VueMaterial);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
