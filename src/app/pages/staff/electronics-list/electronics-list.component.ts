import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {StaffService} from '../staff.service';
import {NotificationService} from '../../../notification.service';
import {DialogService} from '../../../dialog.service';
import {CreateelectronicComponent} from '../create-electronic/create-electronic.component';

@Component({
  selector: 'app-electronics-list',
  templateUrl: './electronics-list.component.html',
  styleUrls: ['./electronics-list.component.scss']
})
export class ElectronicsListComponent implements OnInit, OnDestroy {

  electronics: MatTableDataSource<any>;
  isloading = false;
  displayedColumns: string[] = ['profile_image', 'emp_name',
    'emp_address', 'emp_rfid',
    'city', 'last_login_date',
    'email', 'emp_matricule',
    'status', 'actions'];
  private electronicsub: Subscription;
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
    this.staffService.getElectronics();
    this.isloading = true;
    this.electronicsub = this.staffService.getelectronicsUpdateListner()
      .subscribe((staffs) => {
        this.isloading = false;
        this.electronics = new MatTableDataSource(staffs);
        setTimeout(() => {
          this.electronics.sort = this.sort;
          this.electronics.paginator = this.paginator;
        });
        this.electronics.filterPredicate = (data, filter) => {
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
    this.dialog.open(CreateelectronicComponent, dialogConfig);
  }

  onDelete(emp_id) {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this Electronic ?').afterClosed()
      .subscribe(res => {
        if (res) {
          this.staffService.DeleteElectronic(emp_id);
          this.notificationService.warn(' Deleted successfully!!');
        }
      });
  }

  onCreateElectronic() {
    this.staffService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '80%';
    this.dialog.open(CreateelectronicComponent, dialogConfig);

  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.electronics.filter = this.searchKey.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.electronicsub.unsubscribe();
  }

}
