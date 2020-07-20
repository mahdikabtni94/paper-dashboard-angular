import {MachineTypeModel} from '../machine_types/machine_type.model';

export interface OperationCopyModel {
  operation_id: string;
  label: string;
  op_code: string;
  description: string;
  MachineTypeId: string;
  machine_type: MachineTypeModel;
  time: string;
  accMinPrice: string,
  BundleId: string,
  LineId: string,
  with_subsequence: boolean

}
