import { createStore } from "vuex";

export default createStore({
  state: {
    server: localStorage.getItem("server") || window.location.origin,
    view: localStorage.getItem("view") || "grid",
    order: localStorage.getItem("view") || "asc",
    separate: JSON.parse(localStorage.getItem("separate") || "true"),
    directories: JSON.parse(localStorage.getItem("directories") || "true"),
    files: JSON.parse(localStorage.getItem("files") || "true"),
    collections: JSON.parse(localStorage.getItem("collections") || "null"),
    history: JSON.parse(localStorage.getItem("history") || "[]"),
    index: JSON.parse(localStorage.getItem("index") || "null"),
    report: JSON.parse(localStorage.getItem("report") || "null"),
    notifications: JSON.parse(localStorage.getItem("notifications") || "[]")
  },
  mutations: {
    setServer(state, payload) {
      state.server = payload;
      localStorage.setItem("server", state.server);
    },
    setView(state, payload) {
      state.view = payload;
      localStorage.setItem("view", state.view);
    },
    setOrder(state, payload) {
      state.order = payload;
      localStorage.setItem("order", state.order);
    },
    setDirectories(state, payload) {
      state.directories = payload;
      localStorage.setItem("directories", state.directories);
    },
    setFiles(state, payload) {
      state.files = payload;
      localStorage.setItem("files", state.directories);
    },
    setCollections(state, payload) {
      state.collections = payload;
      localStorage.setItem("collections", JSON.stringify(state.collections));
    },
    setHistory(state, payload) {
      state.history = payload;
      localStorage.setItem("history", JSON.stringify(state.history));
    },
    historyPush(state, payload) {
      state.history.push(payload);
      localStorage.setItem("collections", JSON.stringify(state.history));
    },
    historyPop(state) {
      state.history.pop();
      localStorage.setItem("collections", JSON.stringify(state.history));
    },
    setIndex(state, payload) {
      state.index = payload;
      localStorage.setItem("index", JSON.stringify(state.index));
    },
    increaseIndex(state) {
      let index = state.history.length - 1;
      if (state.index < state.history[index].content.length - 1) {
        state.index++;
      }
      localStorage.setItem("index", JSON.stringify(state.index));
    },
    decreaseIndex(state) {
      if (state.index >= 1) {
        state.index--;
      }
      localStorage.setItem("index", JSON.stringify(state.index));
    },
    setReport(state, payload) {
      state.report = payload;
      localStorage.setItem("report", state.report);
    },
    setNotifications(state, payload) {
      state.notifications = payload;
      localStorage.setItem(
        "notifications",
        JSON.stringify(state.notifications)
      );
    },
    addNotification(state, payload) {
      state.notifications.push(payload);
      localStorage.setItem(
        "notifications",
        JSON.stringify(state.notifications)
      );
    },
    dropNotification(state, payload) {
      state.notifications = state.notifications.filter(
        (notification, index) => {
          return index != payload.index;
        }
      );
      localStorage.setItem(
        "notifications",
        JSON.stringify(state.notifications)
      );
    }
  },
  actions: {},
  modules: {}
});
