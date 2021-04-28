import { createStore } from "vuex";

export default createStore({
  state: {
    paths: [],
    directory: null,
    file: null
  },
  mutations: {
    setPaths(state, payload) {
      state.paths = payload;
    },
    setDirectory(state, payload) {
      state.directory = payload;
    },
    setFile(state, payload) {
      state.directory = payload;
    }
  },
  actions: {},
  modules: {}
});
