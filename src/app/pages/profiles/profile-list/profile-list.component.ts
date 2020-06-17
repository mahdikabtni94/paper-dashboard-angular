import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ProfileModel} from '../profile.model';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../../notification.service';
import {DialogService} from '../../../dialog.service';
import {ProfileService} from '../profile.service';
import {CreateProfileComponent} from '../create-profile/create-profile.component';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit, OnDestroy {
  profiles: MatTableDataSource<ProfileModel>;
  displayedColumns: string[] = ['profile_label', 'profile_description', 'actions'];
  private profileSub: Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  searchKey: string;
  isloading = false;

  constructor(public profileService: ProfileService,
              private  dialog: MatDialog,
              private notificationService: NotificationService,
              private  dialogService: DialogService,
  ) {
  }

  ngOnInit() {
    this.profileService.getProfiles();
    this.isloading = true;
    this.profileSub = this.profileService.getProfilesUpdateListner()
      .subscribe((profiles) => {
        this.isloading = false;
        this.profiles = new MatTableDataSource(profiles);
        setTimeout(() => {
          this.profiles.sort = this.sort;
          this.profiles.paginator = this.paginator;
        });
        this.profiles.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
          });
        };

      });
  }

  onEdit(row) {
    this.profileService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '80%';
    this.dialog.open(CreateProfileComponent, dialogConfig);
  }

  onDelete(profile_id) {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this Profile ?').afterClosed()
      .subscribe(res => {
        if (res) {
          this.profileService.DeleteProfile(profile_id);
          this.notificationService.warn(' Deleted successfully!!');
        }
      });
  }

  onCreateProfile() {
    this.profileService.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '80%';
    this.dialog.open(CreateProfileComponent, dialogConfig);

  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.profiles.filter = this.searchKey.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.profileSub.unsubscribe();
  }

}
