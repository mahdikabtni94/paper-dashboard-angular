import {OrderModel} from './order.model';
import {GroupOp} from './operationGroup.model';


export class BundleModel {
  bundle_id: string;
  num_bundle?: string;
  code?: string;
  version?: string;
  size?: string;
  quantity?: string;
  OrderId?: string;
  order?: OrderModel;
  Operations_group?: GroupOp[];
  operations ? = [];
  lines?: any[] = [];

  constructor(data?) {
    if (data) {
      Object.assign(this, data);
    }
  }

}
