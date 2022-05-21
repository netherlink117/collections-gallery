export class File {
  name: string;
  path: string;
  parent: string;
  type: string;
  mimetype: string;
  size: number;
  data: string;
  constructor(
    name = "",
    path = "",
    parent = "",
    type = "",
    mimetype = "",
    size = 0,
    data = ""
  ) {
    this.name = name;
    this.path = path;
    this.parent = parent;
    this.type = type;
    this.mimetype = mimetype;
    this.size = size;
    this.data = data;
  }
}
