import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatCheckboxChange, MatDialogRef} from '@angular/material';
import {NotificationService} from '../../../notification.service';
import {ProfileService} from '../profile.service';
import {PermissionsModel} from '../../../shared/permissions/permissions.model';
import {Subscription} from 'rxjs';
import {PermissionsService} from '../../../shared/permissions/permissions.service';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit, OnDestroy {
  permissions: PermissionsModel[] = [];
  private permissionSub: Subscription;


  constructor(public dialogref: MatDialogRef<CreateProfileComponent>, public profileService: ProfileService,
              public notificationService: NotificationService, private permissionsService: PermissionsService,
              ) {
  }

  ngOnInit() {
    this.permissionsService.getpermissions();
    this.permissionSub = this.permissionsService.getpermissionsUpdateListner()
      .subscribe((permissions: PermissionsModel[]) => {
        this.permissions = permissions;

      });


  }

  onClear() {
    this.profileService.form.reset();
    this.notificationService.success(':: Form Cleared');
  }

  onClose() {
    this.profileService.form.reset();
    // this.profileService.initializeFormGroup();
    this.dialogref.close();
  }

  onSaveprofile() {
    if (this.profileService.form.valid) {
      if (!this.profileService.form.get('profile_id').value) {
        if (this.profileService.form.value.has_update == null) {
          this.profileService.form.value.has_update = 'N'
        }
        if (this.profileService.form.value.has_save == null) {
          this.profileService.form.value.has_save = 'N'
        }
        if (this.profileService.form.value.has_delete == null) {
          this.profileService.form.value.has_delete = 'N'
        }
        this.profileService.AddProfile(
          this.profileService.form.value.profile_label,
          this.profileService.form.value.profile_description,
          this.profileService.form.value.has_update,
          this.profileService.form.value.has_delete,
          this.profileService.form.value.has_save,
          this.profileService.form.value.permissions,
        );

        this.notificationService.success(':: profile Added successfully');
        this.onClose();
      } else {
        this.profileService.Updateprofile(
          this.profileService.form.value.profile_id,
          this.profileService.form.value.profile_label,
          this.profileService.form.value.profile_description,
          this.profileService.form.value.has_update,
          this.profileService.form.value.has_delete,
          this.profileService.form.value.has_save,
          this.profileService.form.value.permissions,
        );
        this.notificationService.success(':: profile Updated successfully');
        this.onClose();
        location.reload();

      }
    }

  }

  ngOnDestroy(): void {
    this.permissionSub.unsubscribe();
  }


  onChange(event: MatCheckboxChange) {
    const permissions = <FormArray>this.profileService.form.get('permissions') as FormArray;
    if (event.checked) {
      permissions.push(new FormControl(event.source.value))
    } else {
      const i = permissions.controls.findIndex(x => x.value === event.source.value);
      permissions.removeAt(i);

    }


  }
}
