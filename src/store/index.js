import { createStore } from "vuex";
import axios from "axios";
const http = axios.create();

export default createStore({
  state: {
    db: null,
    server: localStorage.getItem("server") || window.location.origin,
    collections: {
      directories: {
        items: [],
        visible: JSON.parse(localStorage.getItem("directories") || "true")
      },
      files: {
        items: [],
        visible: JSON.parse(localStorage.getItem("files") || "true")
      }
    },
    view: localStorage.getItem("view") || "grid", // || list
    order: localStorage.getItem("view") || "asc", // || des
    process: {
      local: "Done.",
      remote: "Done."
    },
    notifications: JSON.parse(localStorage.getItem("notifications") || "[]")
  },
  getters: {
    getPathDirectories: (state) => (path = "/") => {
      let data = state.collections.directories.items.filter((item) => {
        return item.parent.replaceAll("\\", "/") === path;
      });
      return data;
    },
    getPathFiles: (state) => (path = "/") => {
      let data = state.collections.files.items.filter((item) => {
        return item.parent.replaceAll("\\", "/") === path;
      });
      return data;
    }
  },
  mutations: {
    setServer(state, payload) {
      state.server = payload;
      localStorage.setItem("server", state.server);
    },
    setCollections(state, payload) {
      state.collections = payload;
    },
    setDirectoriesVisibility(state, payload) {
      state.collections.directories.visible = payload;
      localStorage.setItem(
        "directories",
        state.collections.directories.visible
      );
    },
    setFilesVisibility(state, payload) {
      state.collections.files.visible = payload;
      localStorage.setItem("files", state.collections.files.visible);
    },
    addDirectory(state, payload) {
      if (
        !state.collections.directories.items.find((item) => {
          item.path === payload.path;
        }) &&
        payload.parent !== "none"
      ) {
        state.collections.directories.items.push(payload);
        state.db
          .transaction("directories", "readwrite")
          .objectStore("directories")
          .add({ ...payload });
      }
    },
    addFile(state, payload) {
      if (
        !state.collections.files.items.find((item) => {
          item.path === payload.path;
        }) &&
        payload.parent !== "none"
      ) {
        state.collections.files.items.push(payload);
        state.db
          .transaction("files", "readwrite")
          .objectStore("files")
          .add({ ...payload });
      }
    },
    setView(state, payload) {
      state.view = payload;
      localStorage.setItem("view", state.view);
    },
    setOrder(state, payload) {
      state.order = payload;
      localStorage.setItem("order", state.order);
    },
    setProcess(state, payload) {
      state.process = payload;
    },
    setProcessLocal(state, payload) {
      state.process.local = payload;
    },
    setProcessRemote(state, payload) {
      state.process.remote = payload;
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
  actions: {
    init({ state, commit, dispatch }) {
      try {
        commit("setProcessLocal", "Initializing...");
        // Prepare API
        let indexedDB =
          window.indexedDB ||
          window.mozIndexedDB ||
          window.webkitIndexedDB ||
          window.msIndexedDB;
        window.IDBTransaction = window.IDBTransaction ||
          window.webkitIDBTransaction ||
          window.msIDBTransaction || { READ_WRITE: "readwrite" };
        window.IDBKeyRange =
          window.IDBKeyRange ||
          window.webkitIDBKeyRange ||
          window.msIDBKeyRange;
        // Open to get request (connection)
        const request = indexedDB.open("collections", 1);
        // Notify on error
        request.onerror = function (event) {
          commit(
            "setProcessLocal",
            "Error opening local database.\nError code: " +
              event.target.errorCode
          );
        };
        // Notify on success
        request.onsuccess = function (event) {
          // Get DB (connection, I guess...)
          state.db = event.target.result;
          commit("setProcessLocal", "Done.");
          dispatch("localDirectories");
          dispatch("localFiles");
        };
        // Triggered when update DB is changed on code
        request.onupgradeneeded = function (event) {
          state.db = event.target.result;
          commit("setProcessLocal", "Updating local database structure...");
          // Delete old directories object if exist
          if (state.db.objectStoreNames.contains("directories")) {
            state.db.deleteObjectStore("directories");
          }
          // Create directories object
          const directoriesStore = state.db.createObjectStore("directories", {
            keyPath: "path"
          });
          // Create index on name from directories
          directoriesStore.createIndex("name", "name", { unique: false });
          // Delete old files object if exist
          if (state.db.objectStoreNames.contains("files")) {
            state.db.deleteObjectStore("files");
          }
          // Create files object
          const filesStore = state.db.createObjectStore("files", {
            keyPath: "path"
          });
          // Create index on name from files
          filesStore.createIndex("name", "name", { unique: false });
          commit("setProcessLocal", "Done.");
        };
      } catch (error) {
        commit("setProcessLocal", "Done.");
        commit("addNotification", {
          message: "An unknown error has ocurred...",
          type: error
        });
      }
    },
    localDirectories({ state, commit }) {
      commit("setProcessLocal", "Loading local directories...");
      state.db
        .transaction("directories")
        .objectStore("directories")
        .getAll().onsuccess = (event) => {
        state.collections.directories.items = event.target.result;
        commit("setProcessLocal", "Done.");
        if (state.collections.directories.items.length <= 0) {
          commit("addNotification", {
            message: "Local directories are empty...",
            type: "information"
          });
        }
      };
    },
    localFiles({ state, commit }) {
      commit("setProcessLocal", "Loading local files...");
      state.db.transaction("files").objectStore("files").getAll().onsuccess = (
        event
      ) => {
        state.collections.files.items = event.target.result;
        commit("setProcessLocal", "Done.");
        if (state.collections.files.items.length <= 0) {
          commit("addNotification", {
            message: "Local files are empty...",
            type: "information"
          });
        }
      };
    },
    remotePath({ state, commit }, payload) {
      commit("setProcessRemote", "Loading remote data...");
      http
        .get(state.server, {
          params: {
            path: payload || "/"
          }
        })
        .then((response) => {
          for (let directory of response.data.content.directories) {
            commit("addDirectory", directory);
          }
          for (let file of response.data.content.files) {
            commit("addFile", file);
          }
          commit("setProcessRemote", "Done.");
        })
        .catch((error) => {
          commit("setProcessRemote", "Done.");
          commit("addNotification", {
            message: error.message,
            type: "information"
          });
        });
    }
  },
  modules: {}
});
