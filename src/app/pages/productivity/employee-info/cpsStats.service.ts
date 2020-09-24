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
export class CpsStatsService {
  private cpsStats: any[] = [];
  private cpsStatsUpdated = new Subject<any[]>();


  constructor(private http: HttpClient, private  router: Router) {
  }

  getcpsStats() {
    this.http.get<{ message: string, data: any[] }>(BACKEND_URL + '/api/box/cpsStats')
      .pipe(map((cpsStatsData) => {
        return cpsStatsData.data.map(cpsStat => {
          return {
            EmployeeId: cpsStat.EmployeeId,
            date_operation: cpsStat.date_operation,
            quantity: cpsStat.quantity,
            start_time: cpsStat.start_time,
            end_time: cpsStat.end_time,
            reparation: cpsStat.reparation,
            time_passed: cpsStat.time_passed,
            total_time_needed: cpsStat.total_time_needed,
            efficiency: cpsStat.efficiency,
            operation_label: cpsStat.operation_label,
            total_quantity_needed: cpsStat.total_quantity_needed,
            quantity_percentage: cpsStat.quantity_percentage
          };
        });
      }))
      .subscribe((transformedcpsStats) => {

        this.cpsStats = transformedcpsStats;
        this.cpsStatsUpdated.next([...this.cpsStats]);

      });
  }

  getEmployeStatsUpdateListner() {
    return this.cpsStatsUpdated.asObservable();
  }

}
