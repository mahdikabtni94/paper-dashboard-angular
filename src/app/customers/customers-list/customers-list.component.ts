import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {CustomerService} from '../customer.service';
import {NotificationService} from '../../notification.service';
import {DialogService} from '../../dialog.service';
import {CustomersComponent} from '../customers.component';
import {AuthService} from '../../auth/auth.service';
import {Users} from '../../pages/users/users.model';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit, OnDestroy {
  userFromStorage: any;
  UserProfile: any
  customers: MatTableDataSource<any>;
  isloading = false;
  currentUser: Users;
  displayedCustomerColumns: string[] = ['client_name', 'address',
    'phoneNumber', 'email',
    'technical_contact', 'sales_contact',
    'fax', 'image',
    'country', 'actions'];
  private customerSub: Subscription;
  @ViewChild(MatSort, {static: false}) customersort: MatSort;
  @ViewChild(MatPaginator, {static: false}) customerpaginator: MatPaginator;
  searchKey: string;

  constructor(private customerService: CustomerService, private  dialog: MatDialog,
              private notificationService: NotificationService,
              private  dialogService: DialogService, private authService: AuthService) {
    this.userFromStorage = this.authService.getToken();
    const tokenInfo = this.authService.getDecodedAccessToken(this.userFromStorage);
    this.UserProfile = tokenInfo.profile;
  }

  ngOnInit() {
    this.customerService.getCustomers();
    this.isloading = true;
    this.customerSub = this.customerService.getCustomerUpdateListner()
      .subscribe((customers) => {
        this.isloading = false;
        this.customers = new MatTableDataSource(customers);
        setTimeout(() => {
          this.customers.sort = this.customersort;
          this.customers.paginator = this.customerpaginator;
        });
        this.customers.filterPredicate = (data, filter) => {
          return this.displayedCustomerColumns.some(ele => {
            return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
          });
        };

      });
  }

  ngOnDestroy(): void {
    this.customerSub.unsubscribe();
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
    this.customers.filter = this.searchKey.trim().toLowerCase();
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
    this.customerService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CustomersComponent, dialogConfig);

  }

}
