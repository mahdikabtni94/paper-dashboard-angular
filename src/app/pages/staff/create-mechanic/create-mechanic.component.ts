import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {NotificationService} from '../../../notification.service';
import {StaffService} from '../staff.service';

@Component({
  selector: 'app-create-mechanic',
  templateUrl: './create-mechanic.component.html',
  styleUrls: ['./create-mechanic.component.scss']
})
export class CreatemechanicComponent implements OnInit {
  imagePreview: string;
  statusList = ['enabled', 'disabled'];
  genders = ['male', 'female'];

  constructor(public dialogref: MatDialogRef<CreatemechanicComponent>,
              public notificationService: NotificationService,
              public staffService: StaffService) {
  }


  ngOnInit() {
    this.imagePreview = this.staffService.form.controls['profile_image'].value

  }

  onClear() {
    this.staffService.form.reset();
    this.notificationService.success(':: Form Cleared');

  }

  onClose() {
    this.staffService.form.reset();
    this.staffService.initializeFormGroup();
    this.dialogref.close();
  }

  onSaveMechanic() {
    if (this.staffService.form.valid) {
      if (!this.staffService.form.get('emp_id').value) {
        this.staffService.AddMechanic(
          this.staffService.form.value.emp_name,
          this.staffService.form.value.emp_lastname,
          this.staffService.form.value.start_working_date,
          this.staffService.form.value.last_login_date,
          this.staffService.form.value.emp_address,
          this.staffService.form.value.emp_rfid,
          this.staffService.form.value.city,
          this.staffService.form.value.emp_age,
          this.staffService.form.value.emp_matricule,
          this.staffService.form.value.profile_image,
          this.staffService.form.value.emp_gender,
          this.staffService.form.value.status,
          this.staffService.form.value.email
        );
        this.staffService.form.reset();
        this.staffService.initializeFormGroup();
        this.notificationService.success(':: Mechanic Added successfully');
        this.onClose();
      } else {
        this.staffService.UpdateMechanic(
          this.staffService.form.value.emp_id,
          this.staffService.form.value.emp_name,
          this.staffService.form.value.emp_lastname,
          this.staffService.form.value.start_working_date,
          this.staffService.form.value.last_login_date,
          this.staffService.form.value.emp_address,
          this.staffService.form.value.emp_rfid,
          this.staffService.form.value.city,
          this.staffService.form.value.emp_age,
          this.staffService.form.value.emp_matricule,
          this.staffService.form.value.profile_image,
          this.staffService.form.value.emp_gender,
          this.staffService.form.value.status,
          this.staffService.form.value.email
        );
        this.staffService.form.reset();
        this.staffService.initializeFormGroup();
        this.notificationService.success(':: Mechanic Updated successfully');
        this.onClose();
      }
    }

  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.staffService.form.patchValue({profile_image: file});
    this.staffService.form.get('profile_image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = <string>reader.result
    };
    reader.readAsDataURL(file);
  }

}
