import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CustomerModel} from './customer.model';
import {Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';

const BACKEND_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customers: CustomerModel[] = [];
  private customersUpdated = new Subject<CustomerModel[]>();
  form: FormGroup = new FormGroup({
    client_id: new FormControl(null),
    client_name: new FormControl('', Validators.required),
    address: new FormControl(''),
    phoneNumber: new FormControl('', Validators.minLength(8)),
    email: new FormControl('', [Validators.email, Validators.required]),
    technical_contact: new FormControl(''),
    sales_contact: new FormControl(''),
    fax: new FormControl(''),
    picpath: new FormControl(''),
    CountryId: new FormControl(''),
    CityId: new FormControl(''),
    StateId: new FormControl('')
  });

  constructor(private http: HttpClient, private  router: Router) {
  }

  AddCustomer(client_name: string, address: string,
              PhoneNumber: string, email: string,
              technical_contact: string,
              sales_contact: string, fax: string,
              picpath: string, CityId: string,
              CountryId: string, StateId: string
  ) {

    const Data = {
      'client_name': client_name,
      'address': address,
      'phoneNumber': PhoneNumber,
      'email': email,
      'technical_contact': technical_contact,
      'sales_contact': sales_contact,
      'fax': fax,
      'picpath': picpath,
      'CityId': CityId,
      'CountryId': CountryId,
      'StateId': StateId

    }
    this.http.post<{ message: string, customer: CustomerModel }>(BACKEND_URL + '/api/customer/add', Data)
      .subscribe((responseData) => {
        const customer: CustomerModel = {
          client_id: responseData.customer.client_id,
          client_name: client_name,
          address: address,
          phoneNumber: PhoneNumber,
          email: email,
          technical_contact: technical_contact,
          sales_contact: sales_contact,
          fax: fax,
          picpath: picpath,
          CountryId: CountryId,
          CityId : CityId,
          StateId : StateId
        }
        this.customers.push(customer);
        this.customersUpdated.next([...this.customers]);
        this.router.navigate(['/admin/users']);

      });
  }

  initializeFormGroup() {
    this.form.setValue({
      'client_id': null,
      'client_name': '',
      'address': '',
      'phoneNumber': '',
      'email': '',
      'technical_contact': '',
      'sales_contact': '',
      'fax': '',
      'picpath': '',
      'CountryId': '',
      'CityId' : '',
      'StateId': ''
    });
  }


}
