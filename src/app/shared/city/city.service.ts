import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

import {Subject} from 'rxjs';
import {CityModel} from './city.model';
import {environment} from '../../../environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private Cities: CityModel[] = [];
  private CitiesUpdated = new Subject<CityModel[]>();

  constructor(private http: HttpClient) {
  }

  getCities(StateId: string) {
    this.http.get<{ message: string, data: any }>(BACKEND_URL + '/api/city/find')
      .pipe(map((Data) => {
        return Data.data.map(city => {
          return {
            city_id: city.city_id,
            city_name: city.city_name,
            StateId : city.StateId
          };
        });
      }))
      .subscribe((transformedCities) => {
        const UpdatedCities =  transformedCities.filter(city => {
          return city.StateId == StateId
        });
        this.Cities = UpdatedCities;
        this.CitiesUpdated.next([...this.Cities]);

      });

  }

  getCitiesUpdateListner() {
    return this.CitiesUpdated.asObservable();
  }


}
