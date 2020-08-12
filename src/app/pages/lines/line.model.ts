import {SiteModel} from '../sites/site.model';
import {OperationModel} from '../production-management/operation-list/operation.model';

export interface LineModel {
  line_id?: string,
  line_label?: string,
  line_description?: string,
  SiteId?: string,
  site?: SiteModel,
  operations?: OperationModel[]


}
