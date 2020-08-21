import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../../notification.service';
import {DialogService} from '../../../dialog.service';
import {MachineModel} from '../machine.model';
import {MachineService} from '../machine.service';
import {CreateMachineComponent} from '../create-machine/create-machine.component';
import {AuthService} from '../../../auth/auth.service';
import {Users} from '../../users/users.model';

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.scss']
})
export class MachineListComponent implements OnInit, OnDestroy {
  userFromStorage: any;
  UserProfile:any;
  Machine: MatTableDataSource<MachineModel>;
  currentUser: Users;
  displayedColumns: string[] = ['machine_label', 'machine_type', 'line', 'actions'];
  private typeSub: Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  searchKey: string;
  isloading = false;

  constructor(public machineService: MachineService,
              private  dialog: MatDialog,
              private notificationService: NotificationService,
              private  dialogService: DialogService,
              private authService: AuthService) {
    this.userFromStorage = this.authService.getToken();
    const tokenInfo = this.authService.getDecodedAccessToken(this.userFromStorage);
    this.UserProfile = tokenInfo.profile;
  }

  ngOnInit() {
    this.machineService.getmachine();
    this.isloading = true;
    this.typeSub = this.machineService.getmachineUpdateListner()
      .subscribe((Machine) => {
        this.isloading = false;
        this.Machine = new MatTableDataSource(Machine);
        setTimeout(() => {
          this.Machine.sort = this.sort;
          this.Machine.paginator = this.paginator;
        });
        console.log('machine*********', this.Machine);
        this.Machine.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
          });
        };

      });
  }

  onEdit(row) {
    this.machineService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '60%';
    this.dialog.open(CreateMachineComponent, dialogConfig);
  }

  onDelete(type_id) {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this Machine ?').afterClosed()
      .subscribe(res => {
        if (res) {
          this.machineService.Deletemachine(type_id);
          this.notificationService.warn(' Deleted successfully!!');
        }
      });
  }

  onCreateMachine() {
    this.machineService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '60%';
    this.dialog.open(CreateMachineComponent, dialogConfig);

  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.Machine.filter = this.searchKey.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.typeSub.unsubscribe();
  }


}


