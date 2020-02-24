import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Users} from '../users.model';
import {Subscription} from 'rxjs';
import {UsersService} from '../users.service';
import {CreateUserComponent} from '../create-user/create-user.component';
import {NotificationService} from '../../../notification.service';
import {DialogService} from '../../../dialog.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: MatTableDataSource<Users>;
  displayedColumns: string[] = ['UserName', 'Name', 'Email', 'Address', 'Phone', 'City', 'Profile', 'Activate', 'actions'];
  private usersSub: Subscription;
  isloading = false;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(public userService: UsersService,
              private  dialog: MatDialog,
              private notificationService: NotificationService,
              private  dialogService: DialogService) {
  }

  ngOnInit() {
    this.userService.getUsers();
    this.isloading = true;
    this.usersSub = this.userService.getUsersUpdateListner()
      .subscribe((users) => {
        this.isloading = false;
        this.users = new MatTableDataSource(users);
        this.users.sort = this.sort;
        this.users.paginator = this.paginator;
        this.users.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
          });
        };

      });

  }

  ngOnDestroy(): void {
    this.usersSub.unsubscribe();

  }

  onEdit(row) {
    this.userService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CreateUserComponent, dialogConfig);
  }

  onDelete(user_id) {
    this.dialogService.openConfirmDialog('Are you sure to delete this User ?').afterClosed()
      .subscribe(res => {
        if (res) {
          this.userService.DeleteUser(user_id);
          this.notificationService.warn('! Deleted successfully');
        }
      });


  }

  onCreate() {
    this.userService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CreateUserComponent, dialogConfig);

  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.users.filter = this.searchKey.trim().toLowerCase();
  }


}



