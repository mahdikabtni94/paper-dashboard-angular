import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {NotificationService} from '../../../notification.service';
import {StaffService} from '../staff.service';

@Component({
  selector: 'app-create-supervisor',
  templateUrl: './create-supervisor.component.html',
  styleUrls: ['./create-supervisor.component.scss']
})
export class CreateSupervisorComponent implements OnInit {
  imagePreview: string;
  statusList = ['enabled', 'disabled'];
  genders = ['male', 'female'];

  constructor(public dialogref: MatDialogRef<CreateSupervisorComponent>,
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

  onSaveSupervisor() {
    if (this.staffService.form.valid) {
      if (!this.staffService.form.get('emp_id').value) {
        this.staffService.AddSupervisor(
          this.staffService.form.value.emp_name,
          this.staffService.form.value.emp_lastname,
          this.staffService.form.value.start_working_date,
          this.staffService.form.value.last_login_date = null,
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
        this.notificationService.success(':: Supervisor Added successfully');
        this.onClose();
      } else {
        this.staffService.UpdateSupervisor(
          this.staffService.form.value.emp_id,
          this.staffService.form.value.emp_name,
          this.staffService.form.value.emp_lastname,
          this.staffService.form.value.start_working_date,
          this.staffService.form.value.last_login_date = null,
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
        this.notificationService.success(':: Supervisor Updated successfully');
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
