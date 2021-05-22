import { createStore } from "vuex";

export default createStore({
  state: {
    view: "grid",
    order: "asc",
    separate: true,
    directories: true,
    files: true,
    collections: null,
    history: [],
    index: null,
    report: null
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
    },
    setIndex(state, payload) {
      state.index = payload;
    },
    increaseIndex(state) {
      let index = state.history.length - 1;
      if (state.index < state.history[index].content.length - 1) {
        state.index++;
      }
    },
    decreaseIndex(state) {
      if (state.index >= 1) {
        state.index--;
      }
    },
    setReport(state, payload) {
      localStorage.setItem("report", payload);
      state.report = payload;
    }
  },
  actions: {},
  modules: {}
});
