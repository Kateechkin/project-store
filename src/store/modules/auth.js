import authAPi from "@/api/auth.js";
import { setItem } from "@/helpers/persistanceStorage";
import router from "@/router";

const state = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
  role: null,
};

export const mutationTypes = {
  registerStart: "[auth] registerStart",
  registerSuccess: "[auth] registerSuccess",
  registerFailure: "[auth] registerFailure",

  loginStart: "[auth] loginStart",
  loginSuccess: "[auth] loginSuccess",
  loginFailure: "[auth] loginFailure",

  getCurrentUserStart: "[auth] getCurrentUserStart",
  getCurrentUserSuccess: "[auth] getCurrentUserSuccess",
  getCurrentUserFailure: "[auth] getCurrentUserFailure",

  exitLoginSuccess: "[auth] exit success",
};
export const actionTypes = {
  register: "[auth] register",
  login: "[auth] login",
  exitLogin: "[auth] exit",
  getCurrentUser: "[auth] getCurrentUser",
};
export const getterTypes = {
  currentUser: "[auth] currentUser",
  isLoggedIn: "[auth] isLoggedIn",
  isAnonymuos: "[auth] isAnonymuos",
};
const getters = {
  [getterTypes.currentUser]: (state) => {
    return state.currentUser;
  },
  [getterTypes.isLoggedIn]: (state) => {
    return Boolean(state.isLoggedIn); //для валидного отображения null
  },
  [getterTypes.isAnonymuos]: (state) => {
    return state.isLoggedIn === false;
  },
};

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  // registerStart(state) {
  //   state.isSubmitting = true
  //   state.validationErrors = null
  // },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.registerFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  [mutationTypes.loginStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;

    state.isLoggedIn = true;
  },
  [mutationTypes.loginFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false;
    state.currentUser = payload;
    state.role = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.getCurrentUserFailure](state) {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.currentUser = null;
  },
};

const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.registerStart);
      authAPi
        .register(credentials)
        .then((response) => {
          context.commit(mutationTypes.registerSuccess, response.data);
          window.localStorage.setItem(
            "accessToken",
            response.data.user_token.token
          );
          setItem("accessToken", response.data.token); //для работы с объектами и массивами
          resolve(response.data);
        })
        .catch((result) => {
          context.commit(mutationTypes.registerFailure, result.response.data);
        });
    });
  },
  [actionTypes.exitLogin](context) {
    context.commit(mutationTypes.exitLoginSuccess);
    window.localStorage.setItem("accessTokenStore", "");
    setItem("accessTokenStore", ""); //для работы с объектами и массивами
    router.push({ name: "login" });
  },
  [actionTypes.login](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.loginStart);
      authAPi
        .login(credentials)
        .then((response) => {
          context.commit(mutationTypes.loginSuccess, response.data);
          window.localStorage.setItem("accessTokenStore", response.data.token);
          setItem("accessTokenStore", response.data.token); //для работы с объектами и массивами
          resolve(response.data);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.loginFailure,
            result.response.data,
            console.log("error", result.response.data)
          );
        });
    });
  },

  [actionTypes.getCurrentUser](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getCurrentUserStart);
      authAPi
        .getCurrentUser()
        .then((response) => {
          context.commit(
            mutationTypes.getCurrentUserSuccess,
            response.data.role
          );
          resolve(response.data);
        })
        .catch(() => {
          context.commit(
            mutationTypes.getCurrentUserFailure,
            router.push({ name: "login" })
          );
        });
    });
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
