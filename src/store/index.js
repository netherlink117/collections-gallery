import { createStore } from "vuex";

export default createStore({
  state: {
    view: "grid",
    order: "asc",
    separate: true,
    directories: true,
    files: true,
    collections: null,
    history: []
  },
  mutations: {
    setView(state, payload) {
      state.view = payload;
    },
    setOrder(state, payload) {
      state.order = payload;
    },
    setDirectories(state, payload) {
      state.directories = payload;
    },
    setFiles(state, payload) {
      state.files = payload;
    },
    setCollections(state, payload) {
      state.collections = payload;
    },
    setHistory(state, payload) {
      state.history = payload;
    },
    historyPush(state, payload) {
      state.history.push(payload);
    },
    historyPop(state) {
      state.history.pop();
    }
  },
  actions: {},
  modules: {}
});
