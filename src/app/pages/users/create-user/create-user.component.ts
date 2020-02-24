import {Component, OnInit} from '@angular/core';
import {UsersService} from '../users.service';
import {MatDialogRef} from '@angular/material';
import {NotificationService} from '../../../notification.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  ProfileList = ['superUser', 'simpleUser', 'admin'];

  // tslint:disable-next-line:max-line-length
  constructor(public dialogref: MatDialogRef<CreateUserComponent>, public userService: UsersService, public notificationService: NotificationService) {
  }


  ngOnInit() {

  }

  onClear() {
    this.userService.form.reset();
    this.notificationService.success(':: Form Cleared');

  }


  onClose() {
    this.userService.form.reset();
    this.userService.initializeFormGroup();
    this.dialogref.close();
  }

  onSaveUser() {
    if (this.userService.form.valid) {
      if (!this.userService.form.get('user_id').value) {
        this.userService.AddUser(
          this.userService.form.value.email,
          this.userService.form.value.Username,
          this.userService.form.value.Name,
          this.userService.form.value.Address,
          this.userService.form.value.Phone,
          this.userService.form.value.City,
          this.userService.form.value.Profile);
        this.userService.form.reset();
        this.userService.initializeFormGroup();
        this.notificationService.success(':: User Added successfully');
        this.onClose();

      } else {
        this.userService.UpdateUser(
          this.userService.form.value.user_id,
          this.userService.form.value.email,
          this.userService.form.value.Username,
          this.userService.form.value.Name,
          this.userService.form.value.Address,
          this.userService.form.value.Phone,
          this.userService.form.value.City,
          this.userService.form.value.Profile
        );
        this.userService.form.reset();
        this.userService.initializeFormGroup();
        this.notificationService.success(':: User Updated successfully');
        this.onClose();

      }

    }


  }


}
