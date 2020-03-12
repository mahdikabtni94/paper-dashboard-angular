import {CountryModel} from '../shared/country.model';

export interface CustomerModel {
  client_id: string,
  client_name: string,
  address: string,
  phoneNumber: string,
  email: string,
  technical_contact: string,
  sales_contact: string,
  fax: string,
  picpath: string,
  CountryId: string,
  CityId: string,
  StateId: string,
  country: CountryModel

}
