import { defineStore } from "pinia";
import { Item } from "@/classes/Item";

export const useIndexStore = defineStore({
  id: "index",
  state: (): {
    db?: IDBDatabase;
    endpoint: string;
    items: Item[];
    current: Item;
    status: "busy" | "free";
  } => ({
    db: undefined,
    endpoint: localStorage.getItem("endpoint") || window.location.origin,
    items: [],
    current: new Item(),
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
          // Delete old items object if exist
          if (this.db) {
            if (this.db.objectStoreNames.contains("items")) {
              this.db.deleteObjectStore("items");
            }
            // Create items object
            const itemsStore = this.db?.createObjectStore("items", {
              keyPath: "path"
            });
            // Create index on path from items
            itemsStore.createIndex("path", "path", { unique: true });
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
    // getChildren(item: Item, cache = false) {
    //   if (this.current.path !== item.path) {
    //     this.current = item;
    //   }
    //   // get remote first if online
    //   if (navigator.onLine && !cache) {
    //     this.status = "busy";
    //     this.current
    //       .getChildrenFromBackend(this.endpoint)
    //       .then((res) => {
    //         console.log(res);
    //         this.status = "free";
    //       })
    //       .catch((err) => console.error(err));
    //   } else {
    //     if (this.db) {
    //       this.status = "busy";
    //       this.current
    //         .getChildrenFromIDBDatabase(this.db)
    //         .then((res) => {
    //           console.log(res);
    //           this.status = "free";
    //         })
    //         .catch((err) => console.error(err));
    //     } else {
    //       console.log("Database not ready...");
    //       this.status = "free";
    //     }
    //   }
    // },
    getChildren(cache = false) {
      // get remote first if online
      if (navigator.onLine && !cache) {
        this.status = "busy";
        this.current
          .getChildrenFromBackend(this.endpoint)
          .then((res) => {
            console.log(res);
            this.status = "free";
          })
          .catch((err) => console.error(err));
      } else {
        if (this.db) {
          this.status = "busy";
          this.current
            .getChildrenFromIDBDatabase(this.db)
            .then((res) => {
              console.log(res);
              this.status = "free";
            })
            .catch((err) => console.error(err));
        } else {
          console.log("Database not ready...");
          this.status = "free";
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
