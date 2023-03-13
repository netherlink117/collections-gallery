import { Item } from "@/classes/Item";

export class File extends Item {
  mimetype: string;
  metadata: any;
  data: string;
  constructor() {
    super(...arguments);
    this.mimetype = '';
    this.metadata = '';
    this.data = '';
  }
  static fromItem(item: Item) {
    let f = new File();
    f.path = item.path;
    f.phash = item.phash;
    f.name = item.name;
    f.type = item.type;
    f.size = item.size;
    f.status = item.status;
    return f;
  }
  getDetailsFromBackend(endpoint: string): Promise<Item | undefined> {
    return new Promise((resolve, reject) => {
      console.log("Getting metadata for: " + this.path);
      this.status = 'busy';
      this.http
        .get(endpoint, {
          params: {
            path: this.path
          }
        })
        .then((response) => {
          this.mimetype = response.data.mimetype
            ? response.data.mimetype
            : undefined;
          this.metadata = response.data.metadata
            ? response.data.metadata
            : undefined;
            this.status = 'free';
          resolve(this);
        })
        .catch((error) => {
          this.status = 'free';
          reject(error);
        });
    });
  }
}
