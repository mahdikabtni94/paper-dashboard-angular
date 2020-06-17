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
import {PhoneService} from '../shared/phoneCountry.service';
import {ICountry} from '../shared/phoneCountry.interface';
import {parsePhoneNumberFromString} from 'libphonenumber-js';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnDestroy {

  countries: CountryModel[] = [];
  states: StateModel[] = [];
  cities: CityModel[] = [];
  subscription: Subscription;
  phoneCountries: any[];
  imagePreview: string;
  selectedCountry: any = 'TN';
  selectedPhoneNumber: any;
  private countrySub: Subscription;
  private stateSub: Subscription;
  private citySub: Subscription;


  constructor(public dialogref: MatDialogRef<CustomersComponent>, public customerService: CustomerService,
              public notificationService: NotificationService, private countryService: CountryService,
              public cityService: CityService, public stateService: StateService,
              private phoneService: PhoneService) {
  }

  ngOnInit() {
    this.fetchCountryList();
    this.countryService.getCountries();
    this.countrySub = this.countryService.getCountriesUpdateListner()
      .subscribe((countries: CountryModel[]) => {
        this.countries = countries;

      });
    this.imagePreview = this.customerService.form.controls['picpath'].value
  }


  onClear() {
    this.customerService.form.reset();
    this.notificationService.success(':: Form Cleared');

  }

  private fetchCountryList(): void {
    this.subscription = this.phoneService.getCountries().subscribe((res: ICountry[]) => {
      this.phoneCountries = res;
    }, error => error);
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
          this.customerService.form.value.picpath,
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
          this.customerService.form.value.picpath,
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
    this.customerService.form.patchValue({picpath: file});
    this.customerService.form.get('picpath').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = <string>reader.result
    };
    reader.readAsDataURL(file);
  }

  resetPhoneNumber(event: any): void {
    this.customerService.form.controls['phoneNumber'].setValue('');
  }

  formatPhoneNumber(event: any): void {
    const inputValue: any = this.customerService.form.controls['phoneNumber'].value;
    const phoneNumber: any = parsePhoneNumberFromString(inputValue, this.selectedCountry);
    if (phoneNumber) {
      this.selectedPhoneNumber = phoneNumber.number;
      const phoneN = phoneNumber.formatInternational();
      this.customerService.form.controls['phoneNumber'].setValue(phoneN.toString());

    }
  }
}
