import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {EmployeeStatsModel} from '../../../shared/employeeStats.model';
import {environment} from '../../../../environments/environment';


const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {
  private employeeStats: any[] = [];
  private employeeStatsUpdated = new Subject<EmployeeStatsModel[]>();


  constructor(private http: HttpClient, private  router: Router) {
  }

  getEmployeeStats() {
    this.http.get<{ message: string, data: any[] }>(BACKEND_URL + '/api/employeeStat/employeeStats')
      .pipe(map((EmployeeStatsData) => {
        return EmployeeStatsData.data.map(employeeStat => {
          return {
            EmployeeId: employeeStat.EmployeeId,
            session_status: employeeStat.session_status,
            productivity: employeeStat.productivity,
            emp_name: employeeStat.emp_name,
            emp_lastname: employeeStat.emp_lastname,
            profile_image: employeeStat.profile_image,
            total_time_passed: employeeStat.total_time_passed,
            emp_matricule: employeeStat.emp_matricule,
            time_first_login: employeeStat.time_first_login,
            time_last_logout: employeeStat.time_last_logout
          };
        });
      }))
      .subscribe((transformedemployeeStats) => {

        this.employeeStats = transformedemployeeStats;
        this.employeeStatsUpdated.next([...this.employeeStats]);

      });
  }
}
