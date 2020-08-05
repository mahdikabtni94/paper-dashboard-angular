import {MachineTypeModel} from '../../machine_types/machine_type.model';

export interface OperationModel {
  operation_template_id: string;
  label: string;
  op_code?: string;
  description?: string;
  MachineTypeId: string;
  machine_type?: MachineTypeModel;
  time?: string;
  accMinPrice?: string;
  with_subsequence?: boolean;

}
