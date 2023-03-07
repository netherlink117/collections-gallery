import axios, { Axios } from "axios";

export class Item {
  path: string;
  phash: string;
  name: string;
  type: string;
  size: number;
  children?: Item[];
  mimetype?: string;
  metadata?: never;
  readonly http: Axios = axios.create();
  constructor(
    path = "/",
    phash = "",
    name = "root",
    type = "directory",
    size = 0,
    children?: Item[],
    mimetype?: string,
    metadata?: never // chane later for metadata (any) object
  ) {
    this.path = path;
    this.phash = phash;
    this.name = name;
    this.type = type;
    this.size = size;
    this.children = children;
    this.mimetype = mimetype;
    this.metadata = metadata;
  }
  getChildrenFromBackend(endpoint: string): Promise<Item[] | undefined> {
    return new Promise((resolve, reject) => {
      this.children = this.children === undefined ? [] : this.children;
      let lastFile: Item | undefined = undefined;
      const index: number = this.children.length - 1;
      if (index >= 0) {
        lastFile = this.children.find(
          (ite: Item, ind: number) => ind === index
        );
      }
      // let lastFile = this.content.files[]
      // get remote first if online
      this.http
        .get(endpoint, {
          params: {
            path: this.path || "/",
            items: 21,
            last: lastFile?.path
          }
        })
        .then((response) => {
          // iterate directories and files then add them to both IDB and explorer
          for (const item of response.data) {
            if (item.type === "directory") {
              const d = new Item(
                item.path,
                item.phash,
                item.name,
                item.type,
                item.size
              );
              // console.log(d);
              const found = this.children?.find((i) => i.path === d.path);
              if (found !== undefined) this.children?.push(d);
              // console.log(found);
            }
          }
          for (const item of response.data) {
            if (item.type === "file") {
              const f = new Item(
                item.path,
                item.phash,
                item.name,
                item.type,
                item.size
              );
              // console.log(f);
              const found = this.children?.find((i) => i.path === f.path);
              if (!found) {
                f.getDetailsFromBackend(endpoint);
                this.children?.push(f);
              }
            }
          }
          console.log(this.children);
          // update path
          resolve(this.children);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  getChildrenFromIDBDatabase(db: IDBDatabase) {
    const dp = new Promise<Item[] | undefined>((resolve, reject) => {
      try {
        db.transaction("items").objectStore("items").getAll().onsuccess = (
          event
        ) => {
          const rawItems = (<IDBRequest>event.target).result;
          for (const item of rawItems) {
            if (item.type === "file") {
              const f = new Item(
                item.path,
                item.phash,
                item.name,
                item.type,
                item.size
              );
              const found = this.children?.find((i) => i.path === f.path);
              if (!found) this.children?.push(f);
            }
          }
          resolve(this.children);
        };
      } catch (e) {
        reject(e);
      }
    });

    const fp = new Promise<Item[] | undefined>((resolve, reject) => {
      try {
        db.transaction("items").objectStore("items").getAll().onsuccess = (
          event
        ) => {
          const rawItems = (<IDBRequest>event.target).result;
          for (const item of rawItems) {
            if (item.type === "file") {
              const f = new Item(
                item.path,
                item.phash,
                item.name,
                item.type,
                item.size
              );
              const found = this.children?.find((i) => i.path === f.path);
              if (!found) this.children?.push(f);
            }
          }
          resolve(this.children);
        };
      } catch (e) {
        reject(e);
      }
    });

    // Promise.allSettled
    return Promise.all([dp, fp])
      .then(() => {
        return this.children;
      })
      .catch((errors) => {
        console.table(errors);
      });
  }
  getDetailsFromBackend(endpoint: string): Promise<Item | undefined> {
    return new Promise((resolve, reject) => {
      this.http
        .get(endpoint, {
          params: {
            path: this.path
          }
        })
        .then((response) => {
          // iterate directories and files then add them to both IDB and explorer
          this.mimetype = response.data.mimetype
            ? response.data.mimetype
            : undefined;
          this.metadata = response.data.metadata
            ? response.data.metadata
            : undefined;
          // update path
          resolve(this);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
