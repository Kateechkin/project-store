import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Order from "../views/Order.vue";
import Errors from "../views/Errors.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      Auth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      Auth: false,
    },
  },
  {
    path: "/order",
    name: "order",
    component: Order,
    meta: {
      Auth: true,
    },
  },
  {
    path: "/*",
    component: Errors,
    // component: { render: (h) => h("div", ["404! Page Not Found!"]) },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
