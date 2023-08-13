import axios, { Axios } from "axios";

export class Item {
  path: string;
  phash: string;
  name: string;
  type: string;
  size: number;
  status: string;
  parent?: string;
  previousItem?: Item;
  nextItem?: Item;
  readonly http: Axios = axios.create();
  constructor(
    path = "",
    phash = "",
    name = "",
    type = "",
    size = 0,
    status = "free"
  ) {
    this.path = path;
    this.phash = phash;
    this.name = name;
    this.type = type;
    this.size = size;
    this.status = status;
  }
  getParentPath(): string {
    const matches = /(^.+)\/[^/]+$/.exec(this.path);
    return matches ? matches[1] : "/";
  }
}
