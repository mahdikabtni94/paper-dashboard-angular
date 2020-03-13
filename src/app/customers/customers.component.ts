import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {NotificationService} from '../notification.service';
import {CustomerService} from './customer.service';
import {CountryService} from '../shared/country.service';
import {CountryModel} from '../shared/country.model';
import {Subscription} from 'rxjs';
import {StateModel} from '../shared/state/state.model';
import {CityModel} from '../shared/city/city.model';
import {CityService} from '../shared/city/city.service';
import {StateService} from '../shared/state/state.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnDestroy {
  countries: CountryModel[] = [];
  states: StateModel[] = [];
  cities: CityModel[] = [];
  // customers: CustomerModel;
  imagePreview: string;
  private clientId: string;

  private countrySub: Subscription;
  private stateSub: Subscription;
  private citySub: Subscription;


  constructor(public dialogref: MatDialogRef<CustomersComponent>, public customerService: CustomerService,
              public notificationService: NotificationService, private countryService: CountryService,
              public cityService: CityService, public stateService: StateService) {
  }

  ngOnInit() {
    this.countryService.getCountries();
    this.countrySub = this.countryService.getCountriesUpdateListner()
      .subscribe((countries: CountryModel[]) => {
        this.countries = countries;

      });
  }

  /* if (this.customerService.form.get('client_id').value) {
     this.clientId = this.customerService.form.get('client_id').value;
     this.customerService.getCustomer(this.clientId).subscribe(customData => {
       this.customers = {
         client_id: customData.data.client_id,
         client_name: customData.data.client_name,
         address: customData.data.address,
         phoneNumber: customData.data.phoneNumber,
         email: customData.data.email,
         technical_contact: customData.data.technical_contact,
         sales_contact: customData.data.sales_contact,
         fax: customData.data.fax,
         picpath: customData.data.picpath,
         CountryId: customData.data.CountryId,
         CityId: customData.data.CityId,
         StateId: customData.data.StateId

       };
       this.customerService.form.setValue({
         client_name: this.customers.client_name,
         address: this.customers.address,
         phoneNumber: this.customers.phoneNumber,
         email: this.customers.email,
         technical_contact: this.customers.technical_contact,
         sales_contact: this.customers.sales_contact,
         fax: this.customers.fax,
         image: this.customers.picpath,
         CountryId: this.customers.CountryId,
         CityId: this.customers.CityId,
         StateId: this.customers.StateId

       });
     });
   } else {
         this.clientId = null

       }
     }


*/


  onClear() {
    this.customerService.form.reset();
    this.notificationService.success(':: Form Cleared');

  }

  onClose() {
    this.customerService.form.reset();
    this.customerService.initializeFormGroup();
    this.dialogref.close();
  }

  onSaveCustomer() {
    if (this.customerService.form.valid) {
      if (!this.customerService.form.get('client_id').value) {
        this.customerService.AddCustomer(
          this.customerService.form.value.client_name,
          this.customerService.form.value.address,
          this.customerService.form.value.phoneNumber,
          this.customerService.form.value.email,
          this.customerService.form.value.technical_contact,
          this.customerService.form.value.sales_contact,
          this.customerService.form.value.fax,
          this.customerService.form.value.image,
          this.customerService.form.value.CountryId,
          this.customerService.form.value.CityId,
          this.customerService.form.value.StateId
        );
        this.customerService.form.reset();
        this.customerService.initializeFormGroup();
        this.notificationService.success(':: Customer Added successfully');
        this.onClose();
      } else {
        this.customerService.UpdateCustomer(
          this.customerService.form.value.client_id,
          this.customerService.form.value.client_name,
          this.customerService.form.value.address,
          this.customerService.form.value.phoneNumber,
          this.customerService.form.value.email,
          this.customerService.form.value.technical_contact,
          this.customerService.form.value.sales_contact,
          this.customerService.form.value.fax,
          this.customerService.form.value.image,
          this.customerService.form.value.CountryId,
          this.customerService.form.value.CityId,
          this.customerService.form.value.StateId
        );
        this.customerService.form.reset();
        this.customerService.initializeFormGroup();
        this.notificationService.success(':: Customer Updated successfully');
        this.onClose();
      }
    }

  }

  ngOnDestroy(): void {
    this.countrySub.unsubscribe();
    this.stateSub.unsubscribe();
    this.citySub.unsubscribe();

  }


  onSelectCountry(country: string) {
    this.stateService.getStates(country);
    this.stateSub = this.stateService.getStatesUpdateListner()
      .subscribe((states: StateModel[]) => {
        this.states = states;
      });


  }

  onSelectState(StateId: string) {
    this.cityService.getCities(StateId);
    this.citySub = this.cityService.getCitiesUpdateListner()
      .subscribe((cities: CityModel[]) => {
        this.cities = cities;

      });

  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.customerService.form.patchValue({image: file});
    this.customerService.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = <string>reader.result
    };
    reader.readAsDataURL(file);
  }
}
