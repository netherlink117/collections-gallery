import { defineStore } from "pinia";

import axios from "axios";
const http = axios.create();

export const useIndexStore = defineStore({
  id: "index",
  state: () => ({
    db: null,
    endpoint: localStorage.getItem("endpoint") || window.location.origin,
    collections: {
      directories: [],
      files: []
    },
    explorer: {
      path: "/",
      file: undefined,
      directories: {
        visible: JSON.parse(localStorage.getItem("directories") || "true"),
        items: []
      },
      files: {
        visible: JSON.parse(localStorage.getItem("files") || "true"),
        items: []
      },
      view: localStorage.getItem("view") || "grid", // || list || viewer
      order: localStorage.getItem("view") || "asc" // || des
    },
    activities: [],
    notifications: JSON.parse(localStorage.getItem("notifications") || "[]")
  }),
  actions: {
    // starts IndexedDB and is call when App launches
    init() {
      return new Promise((resolve, reject) => {
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
        // Triggered when update DB is changed on code
        request.onupgradeneeded = (event) => {
          this.db = event.target.result;
          // Delete old directories object if exist
          if (this.db.objectStoreNames.contains("directories")) {
            this.db.deleteObjectStore("directories");
          }
          // Create directories object
          const directoriesStore = this.db.createObjectStore("directories", {
            keyPath: "path"
          });
          // Create index on name from directories
          directoriesStore.createIndex("name", "name", { unique: false });
          // Delete old files object if exist
          if (this.db.objectStoreNames.contains("files")) {
            this.db.deleteObjectStore("files");
          }
          // Create files object
          const filesStore = this.db.createObjectStore("files", {
            keyPath: "path"
          });
          // Create index on name from files
          filesStore.createIndex("name", "name", { unique: false });
          resolve(this.db);
        };
        // Notify on success
        request.onsuccess = (event) => {
          // Get DB (connection, I guess...)
          this.db = event.target.result;
          resolve(this.db);
        };
        request.onerror = (event) => {
          reject(event.target.errorCode);
        };
      });
    },
    // gets content object and is call when route path changes
    getContent(path = "/", lastFile = undefined, cache = false) {
      let lastFileName = undefined;
      if (lastFile) {
        lastFileName = lastFile.path.split("/");
        lastFileName = lastFileName[lastFileName.length - 1];
      }
      // clear explorer if path changed
      if (this.explorer.path !== path) {
        this.explorer.directories.items = [];
        this.explorer.files.items = [];
      }
      return new Promise((resolve, reject) => {
        // this.explorer.file = undefined;
        // get remote first if online
        if (navigator.onLine && !cache) {
          http
            .get(this.endpoint, {
              params: {
                path: path || "/",
                last: lastFileName
              }
            })
            .then((response) => {
              // iterate directories and files then add them to both IDB and explorer
              for (let directory of response.data.content.directories) {
                this.addDirectoryToCollections(directory);
                this.addDirectoryToExplorer(directory);
              }
              for (let file of response.data.content.files) {
                if (
                  file.parent === path &&
                  (/^.*image.*$/.test(file.mimetype) ||
                    /^.*video.*$/.test(file.mimetype))
                ) {
                  // get binary while online mode is on and while file is image
                  if (/^.*image.*$/.test(file.mimetype)) {
                    fetch(this.endpoint + file.path.replaceAll("\\", "/"))
                      .then((response) => response.blob())
                      .then((blob) => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          file.bin = reader.result;
                          this.addFileToCollections(file);
                          this.addFileToExplorer(file);
                        };
                        reader.readAsDataURL(blob);
                      });
                  } else {
                    this.addFileToCollections(file);
                    this.addFileToExplorer(file);
                  }
                }
              }
              // update path
              this.explorer.path = path;
              resolve(response.data.content);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          // get local only
          const content = { directories: [], files: [] };
          // iterate directories and files then add them to explorer only
          for (let directory of this.collections.directories) {
            if (directory.parent === path) {
              content.directories.push(directory);
              this.addDirectoryToExplorer(directory);
            }
          }
          for (let file of this.collections.files) {
            if (file.parent === path) {
              content.files.push(file);
              this.addFileToExplorer(file);
            }
          }
          this.explorer.path = path;
          resolve(content);
        }
      });
    },
    // gets directories from IndexedDB
    loadLocalDirectories() {
      return new Promise((resolve, reject) => {
        this.db
          .transaction("directories")
          .objectStore("directories")
          .getAll().onsuccess = (event) => {
          this.collections.directories = event.target.result;
          this.collections.directories.length > 0
            ? resolve(this.collections.directories)
            : reject(this.collections.directories);
        };
      });
    },
    // gets files from IndexedDB
    loadLocalFiles() {
      return new Promise((resolve, reject) => {
        this.db.transaction("files").objectStore("files").getAll().onsuccess = (
          event
        ) => {
          this.collections.files = event.target.result;
          this.collections.files > 0
            ? resolve(this.collections.files)
            : reject(this.collections.files);
        };
      });
    },
    // adds directories to collections directories
    addDirectoryToCollections(directory) {
      if (
        !this.collections.directories.find((item) => {
          return item.path === directory.path;
        }) &&
        directory.parent !== "none"
      ) {
        this.collections.directories.push(directory);
        this.db
          .transaction("directories", "readwrite")
          .objectStore("directories")
          .add({ ...directory });
      }
    },
    // adds files to collections files
    addFileToCollections(file) {
      if (
        !this.collections.files.find((item) => {
          return item.path === file.path;
        }) &&
        file.parent !== "none"
      ) {
        this.collections.files.push(file);
        this.db
          .transaction("files", "readwrite")
          .objectStore("files")
          .add({ ...file });
      }
    },
    // adds directories to this explorer directories items
    addDirectoryToExplorer(directory) {
      if (
        !this.explorer.directories.items.find((item) => {
          return item.path === directory.path;
        }) &&
        directory.parent !== "none"
      ) {
        this.explorer.directories.items.push(directory);
      }
    },
    // adds files to this explorer files items
    addFileToExplorer(file) {
      if (
        !this.explorer.files.items.find((item) => {
          return item.path === file.path;
        }) &&
        file.parent !== "none"
      ) {
        this.explorer.files.items.push(file);
      }
    },
    // set endpoint where api call will be made
    setEndpoint(address) {
      this.endpoint = address;
      localStorage.setItem("endpoint", this.endpoint);
    },
    // adds an activity to activities to show kind of notifications
    addActivity(activity) {
      if (
        this.activities.indexOf((a) => {
          return a === activity;
        }) < 0
      ) {
        this.activities.push(activity);
      }
    },
    // removes an activity from activities which show kind of notifications
    removeActivity(activity) {
      this.activities = this.activities.filter((a) => {
        return a !== activity;
      });
    },
    // sets the view mode of the explorer,currently only grid, maybe later list too
    setView(view) {
      this.explorer.view = view;
      localStorage.setItem("view", this.explorer.view);
    },
    // sets the order of the items at explorer directories and files (needs sort algorithm)
    setOrder(order) {
      this.explorer.order = order;
      localStorage.setItem("order", this.explorer.order);
    },
    // set view file
    setFile(file = undefined) {
      this.viewer.file = file;
    },
    getCurrent(path = undefined) {
      return new Promise((resolve, reject) => {
        this.explorer.file = this.collections.files.find(
          (file) => file.path === path
        );
        if (this.explorer.file === undefined) {
          reject("No file found");
        }
        resolve(this.explorer.file);
      });
    }
  }
});
