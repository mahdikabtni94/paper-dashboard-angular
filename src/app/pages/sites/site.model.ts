import {CustomerModel} from '../../customers/customer.model';
import {CountryModel} from '../../shared/country.model';

export interface SiteModel {
  site_id: string,
  site_label: string,
  site_email: string,
  site_phone: string,
  site_technical_contact: string,
  site_prod_contact: string,
  site_fax: string,
  site_address: string,
  CountryId: string,
  StateId: string,
  CityId: string,
  ClientId: string,
  customer: CustomerModel,
  country: CountryModel,


}
