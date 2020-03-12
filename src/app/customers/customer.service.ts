import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CustomerModel} from './customer.model';
import {Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import {mimeType} from './mime-type.validator';
import {map} from 'rxjs/operators';
import {CountryService} from '../shared/country.service';


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
    image: new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [mimeType]
    }),
    CountryId: new FormControl(''),
    CityId: new FormControl(''),
    StateId: new FormControl('')
  });

  constructor(private http: HttpClient, private  router: Router, private countryService: CountryService) {
  }

  AddCustomer(client_name: string, address: string,
              PhoneNumber: string, email: string,
              technical_contact: string,
              sales_contact: string, fax: string,
              image: File, CityId: string,
              CountryId: string, StateId: string
  ) {

    const Data: any = new FormData();
    Data.append('client_name', client_name);
    Data.append('address', address);
    Data.append('phoneNumber', PhoneNumber);
    Data.append('email', email);
    Data.append('technical_contact', technical_contact);
    Data.append('sales_contact', sales_contact);
    Data.append('fax', fax);
    Data.append('image', image, client_name);
    Data.append('CityId', CityId);
    Data.append('CountryId', CountryId);
    Data.append('StateId', StateId);
    for (const key of Data.entries()) {
      console.log(key[0] + ', ' + key[1]);
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
          picpath: responseData.customer.picpath,
          CountryId: CountryId,
          CityId: CityId,
          StateId: StateId,
          country : responseData.customer.country

        };

        console.log('Country***************', customer);
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
      'CountryId': '',
      'CityId': '',
      'StateId': '',
      'image': ''

    });
  }
  populateForm(customer) {
    this.form.setValue (customer);
  }

  getCustomers() {
    this.http.get<{ message: string, data: CustomerModel[] }>(BACKEND_URL + '/api/customer/find')
      .pipe(map((customerData) => {
        return customerData.data.map(customer => {
          console.log('Country***************', customer);
          return {
            client_id: customer.client_id,
            country: customer.country,
            client_name: customer.client_name,
            address: customer.address,
            phoneNumber: customer.phoneNumber,
            email: customer.email,
            technical_contact: customer.technical_contact,
            sales_contact: customer.sales_contact,
            fax: customer.fax,
            picpath: customer.picpath,
            CountryId : customer.CountryId,
            CityId : customer.CityId,
            StateId : customer.StateId,


          };
        });
      }))
      .subscribe((transformedCustomers) => {

        this.customers = transformedCustomers;
        this.customersUpdated.next([...this.customers]);

      });
  }

  getCustomerUpdateListner() {
    return this.customersUpdated.asObservable();
  }
  DeleteCustomer(client_id: String) {
    this.http.delete(BACKEND_URL + '/api/customer/delete/' + client_id).subscribe(
      () => {
        const updatedCustomers = this.customers.filter(customer => customer.client_id !== client_id);
        this.customers = updatedCustomers;
        this.customersUpdated.next([...this.customers]);
      }
    );
  }
UpdateCustomer(client_id: string, client_name: string, address: string,
               PhoneNumber: string, email: string,
               technical_contact: string,
               sales_contact: string, fax: string,
               image: File|string, CityId: string,
               CountryId: string, StateId: string
) {
  let Data: any |FormData;
  if (typeof(image) === 'object') {
     Data = new FormData();
    Data.append('client_name', client_name);
    Data.append('address', address);
    Data.append('phoneNumber', PhoneNumber);
    Data.append('email', email);
    Data.append('technical_contact', technical_contact);
    Data.append('sales_contact', sales_contact);
    Data.append('fax', fax);
    Data.append('image', image, client_name);
    Data.append('CityId', CityId);
    Data.append('CountryId', CountryId);
    Data.append('StateId', StateId);

  } else {
    Data = {
      client_id: client_id,
      client_name: client_name,
      address: address,
      phoneNumber: PhoneNumber,
      email: email,
      technical_contact: technical_contact,
      sales_contact: sales_contact,
      fax: fax,
      picpath: image,
      CountryId: CountryId,
      CityId: CityId,
      StateId: StateId
    }
  }

  this.http.put<{message: string, customer: CustomerModel}>(BACKEND_URL + '/api/customer/update/' + client_id, Data)
    .subscribe(responseData => {
      const UpdatedCustomers = [...this.customers];
      const oldCustomerIndex = UpdatedCustomers.findIndex(p => p.client_id === client_id);
      const customer: CustomerModel = {
        client_id: client_id,
        client_name: client_name,
        address: address,
        phoneNumber: PhoneNumber,
        email: email,
        technical_contact: technical_contact,
        sales_contact: sales_contact,
        fax: fax,
        picpath: responseData.customer.picpath,
        CountryId: CountryId,
        CityId: CityId,
        StateId: StateId,
        country : responseData.customer.country,

      };

      UpdatedCustomers[oldCustomerIndex] = customer;
      this.customers = UpdatedCustomers
      this.customersUpdated.next([...this.customers]);
      this.router.navigate(['/admin/users']);


    })
}
  getCustomer(id: string) {
    return this.http.get<{ message: string, data: CustomerModel }>('http://localhost:3000/api/customer/find/' + id);
  }


}
