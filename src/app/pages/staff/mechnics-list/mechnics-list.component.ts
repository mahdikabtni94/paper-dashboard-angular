import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {StaffService} from '../staff.service';
import {NotificationService} from '../../../notification.service';
import {DialogService} from '../../../dialog.service';
import {CreatemechanicComponent} from '../create-mechanic/create-mechanic.component';


@Component({
  selector: 'app-mechnics-list',
  templateUrl: './mechnics-list.component.html',
  styleUrls: ['./mechnics-list.component.scss']
})
export class MechnicsListComponent implements OnInit, OnDestroy {

  mechanics: MatTableDataSource<any>;
  isloading = false;
  displayedColumns: string[] = ['profile_image', 'emp_name',
    'emp_address', 'emp_rfid',
    'city', 'last_login_date',
    'email', 'emp_matricule',
    'status', 'actions'];
  private mechanicsub: Subscription;
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
    this.staffService.getMechanics();
    this.isloading = true;
    this.mechanicsub = this.staffService.getmechanicUpdateListner()
      .subscribe((staffs) => {
        this.isloading = false;
        this.mechanics = new MatTableDataSource(staffs);
        setTimeout(() => {
          this.mechanics.sort = this.sort;
          this.mechanics.paginator = this.paginator;
        });
        this.mechanics.filterPredicate = (data, filter) => {
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
    this.dialog.open(CreatemechanicComponent, dialogConfig);
  }

  onDelete(emp_id) {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this Mechanic ?').afterClosed()
      .subscribe(res => {
        if (res) {
          this.staffService.DeleteMechanic(emp_id);
          this.notificationService.warn(' Deleted successfully!!');
        }
      });
  }

  onCreateMechanic() {
    this.staffService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '80%';
    this.dialog.open(CreatemechanicComponent, dialogConfig);

  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.mechanics.filter = this.searchKey.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.mechanicsub.unsubscribe();
  }

}
