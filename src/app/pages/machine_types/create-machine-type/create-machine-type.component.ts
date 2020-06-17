import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {NotificationService} from '../../../notification.service';
import {MachineTypeTypeService} from '../machine-type.service';

@Component({
  selector: 'app-create-machine-type',
  templateUrl: './create-machine-type.component.html',
  styleUrls: ['./create-machine-type.component.scss']
})
export class CreateMachineTypeComponent implements OnInit {

  constructor(public dialogref: MatDialogRef<CreateMachineTypeComponent>,
              public machinetypeService: MachineTypeTypeService,
              public notificationService: NotificationService) {
  }

  ngOnInit() {
  }

  onClear() {
    this.machinetypeService.form.reset({
      'type': '',
      'description': '',
    });
    this.notificationService.success(':: Form Cleared');
  }

  onClose() {
    this.machinetypeService.form.reset();
    this.machinetypeService.initializeFormGroup();
    this.dialogref.close();
  }

  onSavemachineType() {
    if (this.machinetypeService.form.valid) {
      if (!this.machinetypeService.form.get('machinetype_id').value) {
        this.machinetypeService.AddMachineType(
          this.machinetypeService.form.value.type,
          this.machinetypeService.form.value.description,
        );
        this.machinetypeService.form.reset();
        this.machinetypeService.initializeFormGroup();
        this.notificationService.success(':: machineType Added successfully');
        this.onClose();
      } else {
        this.machinetypeService.UpdateMachineType(
          this.machinetypeService.form.value.machinetype_id,
          this.machinetypeService.form.value.type,
          this.machinetypeService.form.value.description,
        );
        this.machinetypeService.form.reset();
        this.machinetypeService.initializeFormGroup();
        this.notificationService.success(':: machineType Updated successfully');
        this.onClose();
      }
    }

  }


}
