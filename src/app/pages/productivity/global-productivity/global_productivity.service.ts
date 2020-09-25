import {environment} from '../../../../environments/environment';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class GlobalProductivityService {
  private globalProductivity: any[] = [];
  private globalProductivityUpdated = new Subject<any[]>();


  constructor(private http: HttpClient, private  router: Router) {
  }

  getglobalProductivity() {
    this.http.get<{ message: string, data: any[] }>(BACKEND_URL + '/api/box/global_productivity')
      .pipe(map((globalProductivityData) => {
        return globalProductivityData.data.map(productivity => {
          return {
            total_employees: productivity.total_employees,
            line_label: productivity.line_label,
            line_id: productivity.line_id,
            day_session: productivity.day_session,
            global_productivity: productivity.global_productivity,

          };
        });
      }))
      .subscribe((transformedglobalProductivity) => {

        this.globalProductivity = transformedglobalProductivity;
        this.globalProductivityUpdated.next([...this.globalProductivity]);

      });
  }

  getGlobalProductivityUpdateListner() {
    return this.globalProductivityUpdated.asObservable();
  }
}
