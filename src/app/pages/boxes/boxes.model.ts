import {SiteModel} from '../sites/site.model';
import {MachineModel} from '../machines/machine.model';
import {LineModel} from '../lines/line.model';

export interface BoxModel {
  box_id?: string,
  box_label?: string,
  address_mac?: string,
  description?: string,
  version?: string,
  MachineId?: string,
  machine: MachineModel,
  LineId?: string,
  line?: LineModel

}
