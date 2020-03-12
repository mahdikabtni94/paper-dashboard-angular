import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSlideToggle, MatSort, MatTableDataSource} from '@angular/material';
import {Users} from '../users.model';
import {Subscription} from 'rxjs';
import {UsersService} from '../users.service';
import {CreateUserComponent} from '../create-user/create-user.component';
import {NotificationService} from '../../../notification.service';
import {DialogService} from '../../../dialog.service';
import {CustomerService} from '../../../customers/customer.service';
import {CustomersComponent} from '../../../customers/customers.component';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: MatTableDataSource<Users>;
  customers: MatTableDataSource<any>;
  displayedColumns: string[] = ['UserName', 'Name', 'Email', 'Address', 'Phone', 'City', 'Profile', 'Activate', 'actions'];
  displayedCustomerColumns: string[] = ['client_name', 'address', 'phoneNumber', 'email', 'technical_contact', 'sales_contact', 'fax', 'image', 'country', 'actions'];
  private usersSub: Subscription;
  private customerSub: Subscription;
  isloading = false;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatSort, {static: false}) customersort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatPaginator, {static: false}) customerpaginator: MatPaginator;
  @ViewChild('slide', {static: false}) MatSlideToggle: MatSlideToggle;
  searchKey: string;

  constructor(public userService: UsersService,
              private  dialog: MatDialog,
              private notificationService: NotificationService,
              private  dialogService: DialogService,
              private customerService: CustomerService) {
  }

  ngOnInit() {
    this.userService.getUsers();
    this.customerService.getCustomers();

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
    this.customerSub = this.customerService.getCustomerUpdateListner()
      .subscribe((customers) => {
        this.isloading = false;
        this.customers = new MatTableDataSource(customers);
        this.customers.sort = this.sort;
        this.customers.paginator = this.paginator;
        this.customers.filterPredicate = (data, filter) => {
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
    this.dialogService.openConfirmDialog('Are you sure you want to delete this User ?').afterClosed()
      .subscribe(res => {
        if (res) {
          this.userService.DeleteUser(user_id);
          this.notificationService.warn(' Deleted successfully!!');
        }
      });


  }

  onCreateUser() {
    this.userService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CreateUserComponent, dialogConfig);

  }

  onCreateCustomer() {
    this.customerService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CustomersComponent, dialogConfig);

  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.users.filter = this.searchKey.trim().toLowerCase();
  }


  OnChange(user_id: string) {
    if (this.MatSlideToggle.checked) {
      this.userService.ActivateUser(user_id);
      this.notificationService.success('User Account Activated');

    } else {
      this.userService.DeactivateUser(user_id);
      this.notificationService.warn('User Account Deactivated');
    }


  }

  onDeleteCustomer(client_id) {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this Customer ?').afterClosed()
      .subscribe(res => {
        if (res) {
          this.customerService.DeleteCustomer(client_id);
          this.notificationService.warn(' Deleted successfully!!');
        }
      });

  }

  onEditCustomer(row) {
    console.log('rowwwwwwwwwww', row);
    this.customerService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CustomersComponent, dialogConfig);

  }
}



