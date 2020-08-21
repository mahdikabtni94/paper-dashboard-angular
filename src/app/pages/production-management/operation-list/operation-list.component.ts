import {Component, OnDestroy, OnInit} from '@angular/core';
import {OperationService} from './operation.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {NotificationService} from '../../../notification.service';
import {DialogService} from '../../../dialog.service';
import {OperationModel} from './operation.model';
import {Subscription} from 'rxjs';
import {CreateOperationComponent} from '../create-operation/create-operation.component';
import {AuthService} from '../../../auth/auth.service';
import {Users} from '../../users/users.model';

@Component({
  selector: 'app-operation-list',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.scss']
})
export class OperationListComponent implements OnInit, OnDestroy {
  userFromStorage: any;
  UserProfile: any;
  isloading = false;
  currentUser: Users;
  operations: OperationModel[] = [];
  operationsSub: Subscription;

  constructor(public operationService: OperationService,
              private  dialog: MatDialog,
              private notificationService: NotificationService,
              private  dialogService: DialogService,
              private authService: AuthService) {
    this.userFromStorage = this.authService.getToken();
    const tokenInfo = this.authService.getDecodedAccessToken(this.userFromStorage);
    this.UserProfile = tokenInfo.profile;
  }

  ngOnInit() {
    this.operationService.getOperations();
    this.isloading = true;
    this.operationsSub = this.operationService.getOperationsUpdateListner()
      .subscribe((operations: OperationModel[]) => {
        this.isloading = false;
        this.operations = operations;

      });
  }

  ngOnDestroy(): void {
    if (this.operationsSub && !this.operationsSub.closed) {
      this.operationsSub.unsubscribe();
    }

  }

  onDelete(row: any) {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this Operation ?').afterClosed()
      .subscribe(res => {
        if (res) {
          this.operationService.DeleteOperation(row);
          this.notificationService.warn(' Deleted successfully!!');
        }
      });

  }

  onEdit(row: any) {
    this.operationService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CreateOperationComponent, dialogConfig);
  }

  onCreate() {
    this.operationService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CreateOperationComponent, dialogConfig);

  }
}
