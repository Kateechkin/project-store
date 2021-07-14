import Vue from "vue";
import Vuex from "vuex";
import storage from "@/store/modules/storage";
import auth from "@/store/modules/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    storage,
    auth,
  },
});
