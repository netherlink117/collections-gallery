import { File } from "@/classes/File";
import axios, { Axios } from "axios";

export class Directory {
  name: string;
  path: string;
  parent: string;
  type: string;
  content: { directories: Directory[], files: File[] };
  readonly http: Axios = axios.create();
  constructor(
    name = "root",
    path = "/",
    parent = "",
    type = "directory",
    content: { directories: Directory[], files: File[] } = { directories: [], files: [] }
  ) {
    this.name = name;
    this.path = path;
    this.parent = parent;
    this.type = type;
    this.content = content;
  }
  getContentFromBackend(endpoint: string, lastFile?: File): Promise<{ directories: Directory[], files: File[] }> {
    return new Promise((resolve, reject) => {
      let lastFileName = undefined;
      if (lastFile) {
        lastFileName = lastFile.path.split("/");
        lastFileName = lastFileName[lastFileName.length - 1];
      }
      // get remote first if online
      this.http
        .get(endpoint, {
          params: {
            path: this.path || "/",
            last: lastFileName
          }
        })
        .then((response) => {
          // iterate directories and files then add them to both IDB and explorer
          for (const directory of response.data.content.directories) {
            const d = new Directory();
            d.name = directory.name;
            d.path = directory.path;
            d.parent = directory.parent;
            d.type = directory.type;
            this.content.directories.push(d);
          }
          for (const file of response.data.content.files) {
            if (
              /^.*image.*$/.test(file.mimetype) ||
              /^.*video.*$/.test(file.mimetype)
            ) {
              const f = new File();
              f.name = file.name;
              f.path = file.path;
              f.parent = file.parent;
              f.type = file.type;
              f.mimetype = file.mimetype;
              f.size = file.size;
              this.content.files.push(f);
            }
          }
          // update path
          resolve(this.content);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  getContentFromIDBDatabase(db: IDBDatabase) {
    const dp = new Promise<Directory[]>((resolve, reject) => {
      try {
        db
          .transaction("directories")
          .objectStore("directories")
          .getAll().onsuccess = (event) => {
            const rawDirectories = (<IDBRequest>event.target).result;
            const directories: Directory[] = [];
            for (const directory of rawDirectories) {
              const d = new Directory();
              d.name = directory.name;
              d.path = directory.path;
              d.parent = directory.parent;
              d.type = directory.type;
              // filter here
              directories.push(d);
            }
            resolve(directories);
          };
      } catch (e) {
        reject(e);
      }
    });

    const fp = new Promise<File[]>((resolve, reject) => {
      try {
        db.transaction("files").objectStore("files").getAll().onsuccess = (
          event
        ) => {
          const rawFiles = (<IDBRequest>event.target).result;
          const files: File[] = [];
          for (const file of rawFiles) {
            const f = new File();
            f.name = file.name;
            f.path = file.path;
            f.parent = file.parent;
            f.type = file.type;
            f.mimetype = file.mimetype;
            f.size = file.size;
            // filter here
            files.push(f);
          }
          resolve(files);
        };
      } catch (e) {
        reject(e);
      }
    });

    // Promise.allSettled
    return Promise.all([dp, fp])
      .then((values) => {
        console.table(values);
        this.content.directories = values[0];
        this.content.files = values[1];
      })
      .catch((errors) => {
        console.table(errors);
      });
  }
}