import {OrderModel} from './order.model';


export class BundleModel {
  bundle_id: string;
  num_bundle: string;
  code: string;
  version: string;
  size: string;
  quantity: string;
  OrderId: string;
  LineId: string;
  order: OrderModel;
  lines: [];
  operations: [];

  constructor(data?) {
    if (data) {
      Object.assign(this, data);
    }
  }

}
