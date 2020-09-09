import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../../notification.service';
import {DialogService} from '../../../dialog.service';
import {StaffService} from '../staff.service';
import {CreateOperatorComponent} from '../create-operator/create-operator.component';

@Component({
  selector: 'app-operator-list',
  templateUrl: './operator-list.component.html',
  styleUrls: ['./operator-list.component.scss']
})
export class OperatorListComponent implements OnInit, OnDestroy {
  operators: MatTableDataSource<any>;
  isloading = false;
  displayedColumns: string[] = ['profile_image', 'emp_name',
    'emp_address', 'emp_rfid',
    'city', 'last_login_date',
    'email', 'emp_matricule',
    'status', 'actions'];
  private operatorSub: Subscription;
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
    this.staffService.getOperators();
    this.isloading = true;
    this.operatorSub = this.staffService.getoperatorsUpdateListner()
      .subscribe((staffs) => {
        this.isloading = false;
        this.operators = new MatTableDataSource(staffs);
        setTimeout(() => {
          this.operators.sort = this.sort;
          this.operators.paginator = this.paginator;
        });
        this.operators.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
          });
        };

      });
  }

  onEdit(row) {
    console.log('rowwwwwwwwww', row);
    this.staffService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '80%';
    this.dialog.open(CreateOperatorComponent, dialogConfig);
  }

  onDelete(emp_id) {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this Operator ?').afterClosed()
      .subscribe(res => {
        if (res) {
          this.staffService.DeleteOperator(emp_id);
          this.notificationService.warn(' Deleted successfully!!');
        }
      });
  }

  onCreateOperator() {
    this.staffService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '80%';
    this.dialog.open(CreateOperatorComponent, dialogConfig);

  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.operators.filter = this.searchKey.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.operatorSub.unsubscribe();
  }
}
