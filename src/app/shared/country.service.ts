import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CountryModel} from './country.model';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
const BACKEND_URL = environment.apiUrl;
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private Countries: CountryModel[] = [];
  private CountriesUpdated = new Subject<CountryModel[]>();

  constructor(private http: HttpClient) {
    this.http.get<{ message: string, data: any }>(BACKEND_URL + '/api/country/find')
      .pipe(map((Data) => {
        return Data.data.map(country => {
          return {
            country_id: country.country_id,
            country_name: country.country_name
          };
        });
      }))
      .subscribe((transformedCountries) => {
        this.Countries = transformedCountries;
        this.CountriesUpdated.next([...this.Countries]);

      });
  }

  getCountries() {
    this.http.get<{ message: string, data: any }>(BACKEND_URL + '/api/country/find')
      .pipe(map((Data) => {
        return Data.data.map(country => {
          return {
            country_id: country.country_id,
            country_name: country.country_name
          };
        });
      }))
      .subscribe((transformedCountries) => {
        this.Countries = transformedCountries;
        this.CountriesUpdated.next([...this.Countries]);

      });

  }
  getCountriesUpdateListner() {
    return this.CountriesUpdated.asObservable();
  }
getCountryName(CountryId) {
    if (CountryId == '0') {
      return '';

    } else {
      return _.find(this.Countries, (obj) => obj.country_id == CountryId)['country_name'];

    }
}
}



