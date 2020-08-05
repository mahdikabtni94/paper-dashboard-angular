export class GroupOp {
  line_id?: number;
  operations?: [];


  constructor(data?) {
    if (data) {
      Object.assign(this, data);
    }
  }
}



