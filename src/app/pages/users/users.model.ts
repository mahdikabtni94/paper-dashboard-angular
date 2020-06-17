import {ProfileModel} from '../profiles/profile.model';
import {CustomerModel} from '../../customers/customer.model';

export interface Users {
  user_id: string;
  email: string;
  Username: string;
  Name: string;
  Address: string;
  Phone: string;
  City: string;
  ProfileId: string;
  Activated: boolean;
  profile: ProfileModel,
  ClientId: string;
  customer: CustomerModel

}
