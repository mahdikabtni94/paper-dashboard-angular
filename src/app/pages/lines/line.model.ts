import {SiteModel} from '../sites/site.model';

export interface LineModel {
  line_id: string,
  line_label: string,
  line_description: string,
  SiteId: string,
  site: SiteModel,


}
