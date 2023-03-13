import { File } from "@/classes/File";
import { Item } from "@/classes/Item";

export class Directory extends Item {
  children: Item[];
  last?: Item;
  constructor() {
    super(...arguments);
    this.children = [];
  }
  static fromItem(item: Item) {
    let d = new Directory();
    d.path = item.path;
    d.phash = item.phash;
    d.name = item.name;
    d.type = item.type;
    d.size = item.size;
    d.status = item.status;
    return d;
  }
  getChildrenFromBackend(endpoint: string): Promise<Item[] | undefined> {
    return new Promise((resolve, reject) => {
      this.status = "busy";
      // get remote first if online
      this.http
        .get(endpoint, {
          params: {
            path: this.path || "/",
            items: 21,
            last: this.last?.path
          }
        })
        .then((response) => {
          // if (!Array.isArray(response.data))
          //   reject(this.path + " is not a directory");
          // iterate directories and files then add them to both IDB and explorer
          this.children = this.children === undefined ? [] : this.children;
          for (const item of response.data) {
            const i = new Item(
              item.path,
              item.phash,
              item.name,
              item.type,
              item.size
            );
            const found = this.children.find((ite) => ite.path === i.path);
            if (found === undefined) {
              this.last = i;
              this.children.push(i);
            }
          }
          this.children = this.children.sort((a, b) =>
            a.type < b.type ? 1 : -1
          );
          this.status = "free";
          resolve(this.children);
        })
        .catch((error) => {
          this.status = "free";
          reject(error);
        });
    });
  }
  getChildrenFromIDBDatabase(db: IDBDatabase) {
    return new Promise<Item[] | undefined>((resolve, reject) => {
      this.status = "busy";
      try {
        db.transaction("items").objectStore("items").getAll().onsuccess = (
          event
        ) => {
          this.children = this.children === undefined ? [] : this.children;
          const rawItems = (<IDBRequest>event.target).result;
          // if (!Array.isArray(rawItems)) reject(this.path + " is not a directory")
          for (const item of rawItems) {
            const f = new Item(
              item.path,
              item.phash,
              item.name,
              item.type,
              item.size
            );
            const found = this.children.find((i) => i.path === f.path);
            if (!found) this.children.push(f);
          }
          this.children = this.children.sort((a, b) =>
            a.type < b.type ? 1 : -1
          );
          this.status = "free";
          resolve(this.children);
        };
      } catch (e) {
        this.status = "free";
        reject(e);
      }
    });
  }
}
