import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {NotificationService} from '../../../notification.service';
import {MachineService} from '../machine.service';
import {LineService} from '../../lines/line.service';
import {MachineTypeTypeService} from '../../machine_types/machine-type.service';
import {Subscription} from 'rxjs';
import {LineModel} from '../../lines/line.model';
import {MachineTypeModel} from '../../machine_types/machine_type.model';
import {OperationModel} from '../../production-management/operation-list/operation.model';
import {OperationService} from '../../production-management/operation-list/operation.service';

@Component({
  selector: 'app-create-machine',
  templateUrl: './create-machine.component.html',
  styleUrls: ['./create-machine.component.scss']
})
export class CreateMachineComponent implements OnInit, OnDestroy {

  lines: LineModel[];
  private lineSub: Subscription;
  machineTypes: MachineTypeModel[];
  private typeSub: Subscription;
  private operationsSub: Subscription;
  private selectedAll: boolean;
  private operation_templates: OperationModel[];
  selectedOpeartionTemplateIds: string[];

  constructor(public dialogref: MatDialogRef<CreateMachineComponent>,
              public machineService: MachineService,
              public lineService: LineService,
              public machinetypeService: MachineTypeTypeService,
              public notificationService: NotificationService,
              private operationService: OperationService) {
  }

  ngOnInit() {
    this.lineService.getLines();
    this.lineSub = this.lineService.getlineUpdateListner()
      .subscribe((lines: LineModel[]) => {
        this.lines = lines;

      });
    this.machinetypeService.getMachineTypes();
    this.typeSub = this.machinetypeService.getMachineTypeUpdateListner()
      .subscribe((types: MachineTypeModel[]) => {
        this.machineTypes = types;

      });
  }

  onClear() {
    this.machineService.form.reset();
    this.notificationService.success(':: Form Cleared');
  }

  onClose() {
    this.machineService.form.reset();
    this.machineService.initializeFormGroup();
    this.dialogref.close();
  }

  onSavemachine() {
    if (this.machineService.form.valid) {
      if (!this.machineService.form.get('machine_id').value) {
        this.machineService.Addmachine(
          this.machineService.form.value.machine_label,
          this.machineService.form.value.startworkingdate,
          this.machineService.form.value.manifacturerlifetime,
          this.machineService.form.value.LineId,
          this.machineService.form.value.MachineTypeId,
          this.machineService.form.value.operation_templates,
        );
        console.log('machineType******************', this.machineService.form.value.MachineTypeId)
        this.machineService.form.reset();
        this.machineService.initializeFormGroup();
        this.notificationService.success(':: machine Added successfully');
        this.onClose();
      } else {
        this.machineService.Updatemachine(
          this.machineService.form.value.machine_id,
          this.machineService.form.value.machine_label,
          this.machineService.form.value.startworkingdate,
          this.machineService.form.value.manifacturerlifetime,
          this.machineService.form.value.LineId,
          this.machineService.form.value.MachineTypeId,
          this.machineService.form.value.operation_templates,
        );
        this.machineService.form.reset();
        this.machineService.initializeFormGroup();
        this.notificationService.success(':: machine Updated successfully');
        this.onClose();
      }
    }

  }

  public onSelectAll() {
    if (this.selectedAll === true) {
      const selected = this.operation_templates.map(item => item.operation_template_id);
      this.machineService.form.get('operation_templates').patchValue(selected);
    } else {
      const selected = [];
      this.machineService.form.get('operation_templates').patchValue(selected);
      console.log('false', selected)
    }
  }
  addMachineOperationTemplate = (term) => ({operation_template_id: term, label: term});

  onSelectMachineType(MachineType: string) {
    this.machineService.getOperationsByType(MachineType);
    this.operationsSub = this.machineService.getOperationsUpdateListner()
      .subscribe((operations: OperationModel[]) => {
        this.operation_templates = operations;
      });
  }

  ngOnDestroy(): void {
    this.lineSub.unsubscribe();
    this.operationsSub.unsubscribe();
  }
}
