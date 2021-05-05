import { createStore } from "vuex";

export default createStore({
  state: {
    view: "grid",
    order: "asc",
    separate: true,
    directories: true,
    files: true,
    tree: {
      name: "",
      type: "",
      content: [],
      size: 0
    },
    breadcrumbs: []
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
    setTree(state, payload) {
      state.tree = payload;
    },
    setBreadcrumbs(state, payload) {
      state.breadcrumbs = payload;
    },
    breadcrumbsPush(state, payload) {
      state.breadcrumbs.push(payload);
    },
    breadcrumbsPop(state) {
      state.breadcrumbs.pop();
    }
  },
  actions: {},
  modules: {}
});
