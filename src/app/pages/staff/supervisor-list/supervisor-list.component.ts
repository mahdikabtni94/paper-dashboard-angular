import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {StaffService} from '../staff.service';
import {NotificationService} from '../../../notification.service';
import {DialogService} from '../../../dialog.service';
import {CreateSupervisorComponent} from '../create-supervisor/create-supervisor.component';


@Component({
  selector: 'app-supervisor-list',
  templateUrl: './supervisor-list.component.html',
  styleUrls: ['./supervisor-list.component.scss']
})
export class SupervisorListComponent implements OnInit, OnDestroy {

  supervisors: MatTableDataSource<any>;
  isloading = false;
  displayedColumns: string[] = ['profile_image', 'emp_name',
    'emp_address', 'emp_rfid',
    'city', 'last_login_date',
    'email', 'emp_matricule',
    'status', 'actions'];
  private supervisorsub: Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  searchKey: string;

  constructor(public staffService: StaffService,
              private  dialog: MatDialog,
              private notificationService: NotificationService,
              private  dialogService: DialogService,
  ) {
  }

  ngOnInit() {
    this.staffService.getSupervisors();
    this.isloading = true;
    this.supervisorsub = this.staffService.getsupervisorUpdateListner()
      .subscribe((staffs) => {
        this.isloading = false;
        this.supervisors = new MatTableDataSource(staffs);
        setTimeout(() => {
          this.supervisors.sort = this.sort;
          this.supervisors.paginator = this.paginator;
        });
        this.supervisors.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
          });
        };

      });
  }

  onEdit(row) {
    this.staffService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '80%';
    this.dialog.open(CreateSupervisorComponent, dialogConfig);
  }

  onDelete(emp_id) {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this Supervisor ?').afterClosed()
      .subscribe(res => {
        if (res) {
          this.staffService.DeleteSupervisor(emp_id);
          this.notificationService.warn(' Deleted successfully!!');
        }
      });
  }

  onCreateSupervisor() {
    this.staffService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '80%';
    this.dialog.open(CreateSupervisorComponent, dialogConfig);

  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.supervisors.filter = this.searchKey.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.supervisorsub.unsubscribe();
  }

}
