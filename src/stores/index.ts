import { defineStore } from "pinia";
import { Directory } from "@/classes/Directory";

export const useIndexStore = defineStore({
  id: "index",
  state: (): {
    db?: IDBDatabase;
    endpoint: string;
    current: Directory;
    status: "busy" | "free";
  } => ({
    db: undefined,
    endpoint: localStorage.getItem("endpoint") || window.location.origin,
    current: new Directory(),
    status: "free"
  }),
  actions: {
    // starts IndexedDB and is call when App launches
    init() {
      return new Promise((resolve, reject) => {
        // Prepare API
        const indexedDB =
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
        request.onupgradeneeded = (ev: IDBVersionChangeEvent) => {
          this.db = (<IDBRequest>ev.target).result;
          // Delete old directories object if exist
          if (this.db) {
            if (this.db.objectStoreNames.contains("directories")) {
              this.db.deleteObjectStore("directories");
            }
            // Create directories object
            const directoriesStore = this.db?.createObjectStore("directories", {
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
          }
          resolve(this.db);
        };
        // Notify on success
        request.onsuccess = (event) => {
          // Get DB (connection, I guess...)
          this.db = (<IDBRequest>event.target).result;
          resolve(this.db);
        };
        request.onerror = (event) => {
          reject((<IDBRequest>event.target).error?.code);
        };
      });
    },
    // gets content object and is call when route path changes
    getContent(directory: Directory, cache = false) {
      if (this.current.path !== directory.path) {
        this.current = directory;
      }
      // get remote first if online
      if (navigator.onLine && !cache) {
        this.status = "busy";
        this.current
          .getContentFromBackend(this.endpoint)
          .then((res) => {
            console.log(res);
            this.status = "free";
          })
          .catch((err) => console.error(err));
      } else {
        if (this.db) {
          this.status = "busy";
          this.current
            .getContentFromIDBDatabase(this.db)
            .then((res) => {
              console.log(res);
              this.status = "free";
            })
            .catch((err) => console.error(err));
        } else {
          console.log("Database not ready...");
        }
      }
    },
    setEndpoint(address: string) {
      this.endpoint = address;
      localStorage.setItem("endpoint", this.endpoint);
    }
  }
});

declare global {
  interface Window {
    mozIndexedDB: IDBFactory;
    webkitIndexedDB: IDBFactory;
    msIndexedDB: IDBFactory;
    webkitIDBTransaction: IDBTransaction;
    msIDBTransaction: IDBTransaction;
    webkitIDBKeyRange: IDBKeyRange;
    msIDBKeyRange: IDBKeyRange;
  }
}
