import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

import {Subject} from 'rxjs';
import {StateModel} from './state.model';
import {environment} from '../../../environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private States: StateModel[] = [];
  private StatesUpdated = new Subject<StateModel[]>();

  constructor(private http: HttpClient) {
  }

  getStates(CountryId: string) {
    this.http.get<{ message: string, data: any }>(BACKEND_URL + '/api/state/find' )
      .pipe(map((Data) => {
        return Data.data.map(state => {
          return {
            state_id: state.state_id,
            state_name: state.state_name,
            CountryId : state.CountryId
          };
        });
      }))
      .subscribe((transformedStates) => {
        const UpdatedStates =  transformedStates.filter(state => {
          return state.CountryId == CountryId
        });
        this.States = UpdatedStates;
        this.StatesUpdated.next([...this.States]);

      });

  }

  getStatesUpdateListner() {
    return this.StatesUpdated.asObservable();
  }


}
