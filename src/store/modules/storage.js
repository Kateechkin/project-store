import storageApi from "@/api/storage";
import orderAPi from "@/api/order.js";
// import { setItem } from "@/helpers/persistanceStorage";

const state = {
  data: null,
  isLoading: null,
  error: null,
  // companies: null,
  companieItem: [],
  companieNet: null,
  storage: JSON.parse(localStorage.getItem("storage") || "[]"),
};

export const mutationTypes = {
  getStorageStart: "[storage] Get storage start",
  getStorageSuccess: "[storage] Get storage success",
  getStorageFailure: "[storage] Get storage failre",

  getCompaniesStart: "[storage] Get Companies start",
  getCompaniesSuccess: "[storage] Get Companies success",
  getCompaniesFailure: "[storage] Get Companies failre",

  putCompanieItemStart: "[storage] Put item Companies start",
  putCompanieItemSuccess: "[storage] Put item Companies success",
  putCompanieItemFailure: "[storage] Put item Companies failre",

  getCompanieItemStart: "[storage] get item Companies start",
  getCompanieItemSuccess: "[storage] get item Companies success",
  getCompanieItemFailure: "[storage] get item Companies failre",

  putCommentStart: "[storage] Put Comment start",
  putCommentSuccess: "[storage] Put Comment success",
  putCommentFailure: "[storage] Put Comment failre",

  getCompanieNetStart: "[storage] Get net Companies start",
  getCompanieNetSuccess: "[storage] Get net Companies success",
  ggetCompanieNetFailure: "[storage] Get net Companies failre",

  deleteStorageSuccess: "[storage] Delete storage start",
  deleteItemStorageSuccess: "[storage] Delete item storage start",
  addStorageSuccess: "[storage] Add storage success",

  orderStart: "[order]  orderStart",
  orderSuccess: "[order] orderSuccess",
  orderFailure: "[order] orderFailure",
};
export const actionTypes = {
  getCompanieNet: "[storage] get net storage",
  getCompanieItem: "[storage] get item storage",
  getStorage: "[storage] get to storage",
  putCompanieItem: "[storage] put companies item to storage",
  putComment: "[storage] put comment item to storage",
  addToStorage: "[storage] add to storage",
  deleteItemToStorage: "[storage] delete item from storage",
  deleteStorage: "[storage] delete from storage",
  order: "[order] order",
};

const mutations = {
  [mutationTypes.getStorageStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getStorageSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getStorageFailure](state) {
    state.isLoading = false;
  },
  [mutationTypes.putCompanieItemStart]() {},
  [mutationTypes.putCompanieItemSuccess]() {},
  [mutationTypes.putCompanieItemFailure]() {},
  [mutationTypes.putCommentStart]() {},
  [mutationTypes.putCommentSuccess]() {},
  [mutationTypes.putCommentFailure]() {},

  // [mutationTypes.getCompaniesStart](state) {
  //   state.isLoading = true;
  //   state.data = null;
  // },
  // [mutationTypes.getCompaniesSuccess](state, payload) {
  //   state.isLoading = false;
  //   state.data = payload;
  //   state.companies = payload;
  // },
  // [mutationTypes.getCompaniesFailure](state) {
  //   state.isLoading = false;
  // },

  [mutationTypes.getCompanieItemStart](state) {
    state.isLoading = true;
    state.data = null;
    state.companieItem = null;
  },
  [mutationTypes.getCompanieItemSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
    state.companieItem = payload;
  },
  [mutationTypes.getCompanieItemFailure](state) {
    state.isLoading = false;
  },

  [mutationTypes.getCompanieNetStart](state) {
    state.isLoading = true;
    state.data = null;
    state.companieItem = null;
  },
  [mutationTypes.getCompanieNetSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
    state.companieItem = payload;
    // state.companieNet = payload;
  },
  [mutationTypes.getCompanieNetFailure](state) {
    state.isLoading = false;
  },

  [mutationTypes.deleteItemStorageSuccess](state, index) {
    state.storage.splice(index, 1);
    localStorage.setItem("storage", JSON.stringify(state.storage));
  },
  [mutationTypes.deleteStorageSuccess](state) {
    state.storage = [];
    localStorage.setItem("storage", JSON.stringify(state.storage));
  },

  [mutationTypes.addStorageSuccess](state, payload) {
    if (state.storage.length) {
      let isProduct = false;
      state.storage.map(function(item) {
        if (
          item.product_title === payload.product_title &&
          item.company_title === payload.company_title
        ) {
          isProduct = true;

          localStorage.setItem("storage", JSON.stringify(state.storage));
        }
      });
      if (!isProduct) {
        state.storage.push(payload);

        localStorage.setItem("storage", JSON.stringify(state.storage));
      }
    } else {
      state.storage.push(payload);
      localStorage.setItem("storage", JSON.stringify(state.storage));
    }
  },
  [mutationTypes.orderStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },

  [mutationTypes.orderSuccess](state) {
    state.isSubmitting = false;
    state.storage = [];
    localStorage.setItem("storage", JSON.stringify(state.storage));
  },
  [mutationTypes.orderFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
};
const actions = {
  [actionTypes.addToStorage](context, storage) {
    context.commit(mutationTypes.addStorageSuccess, storage);
  },
  [actionTypes.deleteItemToStorage](context, item) {
    context.commit(mutationTypes.deleteItemStorageSuccess, item);
  },
  [actionTypes.deleteStorage](context) {
    context.commit(mutationTypes.deleteStorageSuccess);
  },

  [actionTypes.putCompanieItem](context, companie) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.putCompanieItemStart);
      storageApi
        .putCompanieItem(companie)
        .then((response) => {
          context.commit(mutationTypes.putCompanieItemSuccess, response.data);
          resolve(response.data);
        })
        .catch((err) => {
          context.commit(
            mutationTypes.putCompanieItemFailure,
            // result.response.data,
            console.log("error", err)
          );
        });
    });
  },
  [actionTypes.putComment](context, companie) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.putCommentStart);
      storageApi
        .putComment(companie)
        .then((response) => {
          context.commit(mutationTypes.putCommentSuccess, response.data);
          resolve(response.data);
        })
        .catch((err) => {
          context.commit(
            mutationTypes.putCommentFailure,
            // result.response.data,
            console.log("error", err)
          );
        });
    });
  },

  [actionTypes.getCompanieItem](context, apiUrl) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getCompanieItemStart);
      storageApi
        .getCompanieItem(apiUrl)
        .then((response) => {
          context.commit(mutationTypes.getCompanieItemSuccess, response.data);
          resolve(response.data);
        })
        .catch((err) => {
          context.commit(
            mutationTypes.getCompanieItemFailure,
            // result.response.data,
            console.log("error", err)
          );
        });
    });
  },
  [actionTypes.getCompanieNet](context, apiUrl) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getCompanieNetStart);
      storageApi
        .getCompanieNet(apiUrl)
        .then((response) => {
          context.commit(mutationTypes.getCompanieNetSuccess, response.data);
          resolve(response.data);
        })
        .catch((err) => {
          context.commit(
            mutationTypes.getCompanieNetFailure,

            console.log("error", err)
          );
        });
    });
  },
  [actionTypes.order](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.orderStart);
      orderAPi
        .order(credentials)
        .then((response) => {
          context.commit(mutationTypes.orderSuccess);
          resolve(response.data);
        })
        .catch(() => {
          context.commit(mutationTypes.orderFailure);
        });
    });
  },
};

export default {
  state,
  actions,
  mutations,
  //   getters,
};
