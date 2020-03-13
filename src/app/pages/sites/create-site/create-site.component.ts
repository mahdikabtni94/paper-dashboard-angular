import {Component, OnDestroy, OnInit} from '@angular/core';
import {CountryModel} from '../../../shared/country.model';
import {StateModel} from '../../../shared/state/state.model';
import {CityModel} from '../../../shared/city/city.model';
import {Subscription} from 'rxjs';
import {MatDialogRef} from '@angular/material';
import {NotificationService} from '../../../notification.service';
import {CountryService} from '../../../shared/country.service';
import {CityService} from '../../../shared/city/city.service';
import {StateService} from '../../../shared/state/state.service';
import {SitesService} from '../sites.service';
import {CustomerModel} from '../../../customers/customer.model';
import {CustomerService} from '../../../customers/customer.service';

@Component({
  selector: 'app-create-site',
  templateUrl: './create-site.component.html',
  styleUrls: ['./create-site.component.scss']
})
export class CreateSiteComponent implements OnInit, OnDestroy {
  countries: CountryModel[] = [];
  states: StateModel[] = [];
  cities: CityModel[] = [];
  clients: CustomerModel [] = [];


  private countrySub: Subscription;
  private stateSub: Subscription;
  private citySub: Subscription;
  private customerSub: Subscription;


  constructor(public dialogref: MatDialogRef<CreateSiteComponent>, public siteService: SitesService,
              public notificationService: NotificationService, private countryService: CountryService,
              public cityService: CityService, public stateService: StateService, public customerService: CustomerService) {
  }

  ngOnInit() {
    this.countryService.getCountries();
    this.countrySub = this.countryService.getCountriesUpdateListner()
      .subscribe((countries: CountryModel[]) => {
        this.countries = countries;

      });
    this.customerService.getCustomers();
    this.customerSub = this.customerService.getCustomerUpdateListner()
      .subscribe((customers: CustomerModel[]) => {
        this.clients = customers;

      });


  }

  onClear() {
    this.siteService.form.reset();
    this.notificationService.success(':: Form Cleared');
  }

  onClose() {
    this.siteService.form.reset();
    this.siteService.initializeFormGroup();
    this.dialogref.close();
  }

  onSaveSite() {
    if (this.siteService.form.valid) {
      if (!this.siteService.form.get('site_id').value) {
        this.siteService.AddSite(
          this.siteService.form.value.site_label,
          this.siteService.form.value.site_email,
          this.siteService.form.value.site_phone,
          this.siteService.form.value.site_technical_contact,
          this.siteService.form.value.site_prod_contact,
          this.siteService.form.value.site_fax,
          this.siteService.form.value.site_address,
          this.siteService.form.value.CountryId,
          this.siteService.form.value.CityId,
          this.siteService.form.value.StateId,
          this.siteService.form.value.ClientId
        );
        this.siteService.form.reset();
        this.siteService.initializeFormGroup();
        this.notificationService.success(':: Site Added successfully');
        this.onClose();
      } else {
        this.siteService.UpdateSite(
          this.siteService.form.value.site_id,
          this.siteService.form.value.site_label,
          this.siteService.form.value.site_email,
          this.siteService.form.value.site_phone,
          this.siteService.form.value.site_technical_contact,
          this.siteService.form.value.site_prod_contact,
          this.siteService.form.value.site_fax,
          this.siteService.form.value.site_address,
          this.siteService.form.value.CountryId,
          this.siteService.form.value.CityId,
          this.siteService.form.value.StateId,
          this.siteService.form.value.ClientId
        );
        this.siteService.form.reset();
        this.siteService.initializeFormGroup();
        this.notificationService.success(':: Site Updated successfully');
        this.onClose();
      }
    }

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


  ngOnDestroy(): void {
    this.countrySub.unsubscribe();
    this.stateSub.unsubscribe();
    this.citySub.unsubscribe();
    this.customerSub.unsubscribe();
  }


}
