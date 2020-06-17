import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {SiteModel} from './site.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CountryService} from '../../shared/country.service';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';


const BACKEND_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class SitesService {
  private sites: SiteModel[] = [];
  private sitesUpdated = new Subject<SiteModel[]>();
  form: FormGroup = new FormGroup({
    site_id: new FormControl(null),
    site_label: new FormControl('', [Validators.required]),
    site_email: new FormControl('', Validators.email),
    site_phone: new FormControl('', Validators.minLength(8)),
    site_technical_contact: new FormControl(''),
    site_prod_contact: new FormControl(''),
    site_fax: new FormControl(''),
    site_address: new FormControl(''),
    CountryId: new FormControl(''),
    CityId: new FormControl(''),
    StateId: new FormControl(''),
    ClientId: new FormControl(''),
  });

  constructor(private http: HttpClient, private  router: Router, private countryService: CountryService) {
  }

  AddSite(site_label: string, site_email: string,
          site_phone: string, site_technical_contact: string,
          site_prod_contact: string, site_fax: string,
          site_address: string, CityId: string,
          CountryId: string, StateId: string,
          ClientId: string
  ) {
    const Data = {
      'site_label': site_label,
      'site_email': site_email,
      'site_phone': site_phone,
      'site_technical_contact': site_technical_contact,
      'site_prod_contact': site_prod_contact,
      'site_fax': site_fax,
      'site_address': site_address,
      'CityId': CityId,
      'CountryId': CountryId,
      'StateId': StateId,
      'ClientId': ClientId
    }
    this.http.post<{ message: string, data: SiteModel }>(BACKEND_URL + '/api/site/add', Data)
      .subscribe((responseData) => {
        const site: SiteModel = {
          site_id: responseData.data.site_id,
          site_label: site_label,
          site_email: site_email,
          site_phone: site_phone,
          site_technical_contact: site_technical_contact,
          site_prod_contact: site_prod_contact,
          site_fax: site_fax,
          site_address: site_address,
          CountryId: CountryId,
          StateId: StateId,
          CityId: CityId,
          ClientId: ClientId,
          country: responseData.data.country,
          customer: responseData.data.customer
        }
        this.sites.push(site);
        this.sitesUpdated.next([...this.sites]);
        this.router.navigate(['admin/users/SiteList']);

      });
  }

  getSites() {
    this.http.get<{ message: string, data: SiteModel[] }>(BACKEND_URL + '/api/site/find')
      .pipe(map((siteData) => {
        return siteData.data.map(site => {
          return {
            site_id: site.site_id,
            site_label: site.site_label,
            site_email: site.site_email,
            site_phone: site.site_phone,
            site_technical_contact: site.site_technical_contact,
            site_prod_contact: site.site_prod_contact,
            site_fax: site.site_fax,
            site_address: site.site_address,
            CountryId: site.CountryId,
            StateId: site.StateId,
            CityId: site.CityId,
            ClientId: site.ClientId,
            country: site.country,
            customer: site.customer

          };
        });
      }))
      .subscribe((transformedSites) => {

        this.sites = transformedSites;
        this.sitesUpdated.next([...this.sites]);

      });
  }

  populateForm(site) {
    this.form.patchValue(site);
  }

  getSiteUpdateListner() {
    return this.sitesUpdated.asObservable();
  }

  DeleteSite(site_id: String) {
    this.http.delete(BACKEND_URL + '/api/site/delete/' + site_id).subscribe(
      () => {
        const updatedSites = this.sites.filter(site => site.site_id !== site_id);
        this.sites = updatedSites;
        this.sitesUpdated.next([...this.sites]);
      }
    );
  }

  UpdateSite(site_id: string, site_label: string,
             site_email: string, site_phone: string,
             site_technical_contact: string, site_prod_contact: string,
             site_fax: string, site_address: string,
             CountryId: string, StateId: string,
             CityId: string, ClientId: string,
  ) {

    const SiteData = {
      site_id: site_id,
      site_label: site_label,
      site_email: site_email,
      site_phone: site_phone,
      site_technical_contact: site_technical_contact,
      site_prod_contact: site_prod_contact,
      site_fax: site_fax,
      site_address: site_address,
      CountryId: CountryId,
      StateId: StateId,
      CityId: CityId,
      ClientId: ClientId,
    }
    this.http.put<{ message: string, data: SiteModel }>(BACKEND_URL + '/api/site/update/' + site_id, SiteData)
      .subscribe(responseData => {
        const UpdatedSites = [...this.sites];
        const oldSitesIndex = UpdatedSites.findIndex(s => s.site_id === site_id);
        const site: SiteModel = {
          site_id: site_id,
          site_label: site_label,
          site_email: site_email,
          site_phone: site_phone,
          site_technical_contact: site_technical_contact,
          site_prod_contact: site_prod_contact,
          site_fax: site_fax,
          site_address: site_address,
          CountryId: CountryId,
          StateId: StateId,
          CityId: CityId,
          ClientId: ClientId,
          country: responseData.data.country,
          customer: responseData.data.customer
        }
        UpdatedSites[oldSitesIndex] = site;
        this.sites = UpdatedSites;
        this.sitesUpdated.next([...this.sites]);
        this.router.navigate(['admin/users/SiteList']);


      })

  }

  initializeFormGroup() {
  this.form.setValue({
    'site_id': null,
    'site_label': '',
    'site_email': '',
    'site_phone': '',
    'site_technical_contact': '',
    'site_prod_contact': '',
    'site_fax': '',
    'site_address': '',
    'CountryId': '',
    'CityId': '',
    'StateId': '',
    'ClientId': '',

  });
}
}

