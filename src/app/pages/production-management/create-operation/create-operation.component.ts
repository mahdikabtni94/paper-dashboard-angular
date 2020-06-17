import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef, MatSlideToggle} from '@angular/material';
import {NotificationService} from '../../../notification.service';
import {OperationService} from '../operation-list/operation.service';
import {MachineTypeTypeService} from '../../machine_types/machine-type.service';
import {MachineTypeModel} from '../../machine_types/machine_type.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-create-operation',
  templateUrl: './create-operation.component.html',
  styleUrls: ['./create-operation.component.scss']
})
export class CreateOperationComponent implements OnInit, OnDestroy {
  machines: MachineTypeModel[] = [];
 machinesSub: Subscription;
 @ViewChild('slide', {static: false}) MatSlideToggle: MatSlideToggle;
  constructor(public dialogref: MatDialogRef<CreateOperationComponent>, public operationService: OperationService,
              public notificationService: NotificationService, private machineTypeService: MachineTypeTypeService) {
  }

  ngOnInit() {
    this.machineTypeService.getMachineTypes();
    this.machinesSub = this.machineTypeService.getMachineTypeUpdateListner()
      .subscribe((machines: MachineTypeModel[]) => {
        this.machines = machines;

      });
  }

  onClear() {
    this.operationService.form.reset();
    this.notificationService.success(':: Form Cleared');

  }

  onClose() {
    this.operationService.form.reset();
    this.operationService.initializeFormGroup();
    this.dialogref.close();
  }

  onSaveoperation() {
    if (this.operationService.form.valid) {
      if (!this.operationService.form.get('operation_template_id').value) {
        this.operationService.AddOperation(
          this.operationService.form.value.label,
          this.operationService.form.value.op_code,
          this.operationService.form.value.MachineTypeId,
          this.operationService.form.value.description,
          this.operationService.form.value.time,
          this.operationService.form.value.accMinPrice,
          this.operationService.form.value.with_subsequence);
        console.log('form**********', this.operationService.form)
        this.operationService.form.reset();
        this.operationService.initializeFormGroup();
        this.notificationService.success(':: operation Added successfully');
        this.onClose();

      } else {
        this.operationService.UpdateOperation(
          this.operationService.form.value.operation_template_id,
          this.operationService.form.value.label,
          this.operationService.form.value.op_code,
          this.operationService.form.value.description,
          this.operationService.form.value.MachineTypeId,
          this.operationService.form.value.time,
          this.operationService.form.value.accMinPrice,
          this.operationService.form.value.with_subsequence,
        );
        this.operationService.form.reset();
        this.operationService.initializeFormGroup();
        this.notificationService.success(':: operation Updated successfully');
        this.onClose();

      }

    }
  }

  ngOnDestroy(): void {
    this.machinesSub.unsubscribe();
  }

  OnChange() {
    if (this.MatSlideToggle.checked) {
      this.operationService.form.value.with_subsequence = true ;
      this.notificationService.success('with subsequences');

    } else {
      this.operationService.form.value.with_subsequence = false ;
      this.notificationService.warn('no subsequences');
    }
  }
}
