import { createStore } from "vuex";

export default createStore({
  state: {
    directories: [],
    directory: null,
    file: null
  },
  mutations: {
    setDirectories(state, payload) {
      state.directories = payload;
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
