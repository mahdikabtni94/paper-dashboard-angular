import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SiteModel} from '../site.model';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../../notification.service';
import {DialogService} from '../../../dialog.service';
import {SitesService} from '../sites.service';
import {CreateSiteComponent} from '../create-site/create-site.component';
import {AuthService} from '../../../auth/auth.service';
import {Users} from '../../users/users.model';

@Component({
  selector: 'app-sites-list',
  templateUrl: './sites-list.component.html',
  styleUrls: ['./sites-list.component.scss']
})
export class SitesListComponent implements OnInit, OnDestroy {
  userFromStorage: any;
  UserProfile: any;
  sites: MatTableDataSource<SiteModel>;
  currentUser: Users;
  displayedColumns: string[] = ['Label', 'Email',
    'Phone', 'Technical_Contact',
    'Prod_Contact', 'Fax',
    'Address', 'Country',
    'Client', 'actions'];
  private siteSub: Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  searchKey: string;
  isloading = false;

  constructor(public siteService: SitesService,
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
    this.siteService.getSites();
    this.isloading = true;
    this.siteSub = this.siteService.getSiteUpdateListner()
      .subscribe((sites) => {
        this.isloading = false;
        this.sites = new MatTableDataSource(sites);
        setTimeout(() => {
          this.sites.sort = this.sort;
          this.sites.paginator = this.paginator;
        });
        this.sites.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
          });
        };

      });
  }

  onEdit(row) {
    this.siteService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CreateSiteComponent, dialogConfig);
  }

  onDelete(site_id) {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this Site ?').afterClosed()
      .subscribe(res => {
        if (res) {
          this.siteService.DeleteSite(site_id);
          this.notificationService.warn(' Deleted successfully!!');
        }
      });
  }

  onCreateSite() {
    this.siteService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CreateSiteComponent, dialogConfig);

  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.sites.filter = this.searchKey.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.siteSub.unsubscribe();
  }

}
