import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {Users} from '../../users/users.model';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../../notification.service';
import {DialogService} from '../../../dialog.service';
import {AuthService} from '../../../auth/auth.service';
import {AttendenceService} from './attendence.service';
import {EmployeeStatsModel} from '../../../shared/employeeStats.model';
import {EmployeeInfoComponent} from '../employee-info/employee-info.component';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit, OnDestroy {

  userFromStorage: any;
  UserProfile: any;
  employeestats: MatTableDataSource<EmployeeStatsModel>;
  currentUser: Users;
  displayedColumns: string[] = ['day_session', 'profile_image', 'emp_matricule',
    'emp_name', 'emp_lastname', 'total_time_passed', 'session_status', 'productivity', 'actions'];
  private employeestatSub: Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  searchKey: string;
  isloading = false;

  constructor(public attendenceService: AttendenceService,
              private  dialog: MatDialog,
              private notificationService: NotificationService,
              private  dialogService: DialogService,
              private authService: AuthService
  ) {
    this.userFromStorage = this.authService.getToken();
    const tokenInfo = this.authService.getDecodedAccessToken(this.userFromStorage);
    this.UserProfile = tokenInfo.profile;
  }

  ngOnInit() {
    this.attendenceService.getEmployeeStats();
    this.isloading = true;
    this.employeestatSub = this.attendenceService.getEmployeStatsUpdateListner()
      .subscribe((employeestats) => {
        this.isloading = false;
        this.employeestats = new MatTableDataSource<EmployeeStatsModel>(employeestats);
        setTimeout(() => {
          this.employeestats.sort = this.sort;
          this.employeestats.paginator = this.paginator;
        });
        this.employeestats.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele === 'day_session' && data[ele].toLowerCase().indexOf(filter) !== -1;
          });
        };

      });
  }

  EmployeeInfo(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '80%';
    dialogConfig.data = {
      cpsDay: row.day_session,
      cpsEmp: row.EmployeeId
    };
    this.dialog.open(EmployeeInfoComponent, dialogConfig);

  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.employeestats.filter = this.searchKey.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.employeestatSub.unsubscribe();
  }


}
