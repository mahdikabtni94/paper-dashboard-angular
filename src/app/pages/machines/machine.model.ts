import {LineModel} from '../lines/line.model';
import {MachineTypeModel} from '../machine_types/machine_type.model';

export interface MachineModel {
  machine_id: string,
  machine_label: string,
  startworkingdate: Date,
  manifacturerlifetime: string,
  LineId: string,
  MachineTypeId: string,
  line: LineModel,
  machine_type: MachineTypeModel,
  operation_templates: [],
}
