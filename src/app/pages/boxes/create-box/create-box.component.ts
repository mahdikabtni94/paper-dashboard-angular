import {Component, OnDestroy, OnInit} from '@angular/core';
import {LineModel} from '../../lines/line.model';
import {Subscription} from 'rxjs';
import {MatDialogRef} from '@angular/material';

import {NotificationService} from '../../../notification.service';
import {MachineModel} from '../../machines/machine.model';
import {BoxService} from '../boxes.service';
import {MachineService} from '../../machines/machine.service';
import {LineService} from '../../lines/line.service';

@Component({
  selector: 'app-create-box',
  templateUrl: './create-box.component.html',
  styleUrls: ['./create-box.component.scss']
})
export class CreateBoxComponent implements OnInit, OnDestroy {

  lines: LineModel[];
  machines: MachineModel[];
  private lineSub: Subscription;
  private machineSub: Subscription;

  constructor(public dialogref: MatDialogRef<CreateBoxComponent>,
              public boxService: BoxService,
              public lineService: LineService,
              public machineService: MachineService,
              public notificationService: NotificationService) {
  }

  ngOnInit() {
    this.lineService.getLines();
    this.lineSub = this.lineService.getlineUpdateListner()
      .subscribe((lines: LineModel[]) => {
        this.lines = lines;

      });
    this.machineService.getmachine();
    this.machineSub = this.machineService.getmachineUpdateListner()
      .subscribe((machines: MachineModel[]) => {
        this.machines = machines;

      });
  }

  onClear() {
    this.boxService.form.reset();
    this.notificationService.success(':: Form Cleared');
  }

  onClose() {
    this.boxService.form.reset();
    this.boxService.initializeFormGroup();
    this.dialogref.close();
  }

  onSavebox() {
    if (this.boxService.form.valid) {
      if (!this.boxService.form.get('box_id').value) {
        this.boxService.Addbox(
          this.boxService.form.value.box_label,
          this.boxService.form.value.address_mac,
          this.boxService.form.value.description,
          this.boxService.form.value.version,
          this.boxService.form.value.MachineId,
          this.boxService.form.value.LineId,
        );
        this.boxService.form.reset();
        this.boxService.initializeFormGroup();
        this.notificationService.success(':: box Added successfully');
        this.onClose();
      } else {
        this.boxService.Updatebox(
          this.boxService.form.value.box_id,
          this.boxService.form.value.box_label,
          this.boxService.form.value.address_mac,
          this.boxService.form.value.description,
          this.boxService.form.value.version,
          this.boxService.form.value.MachineId,
          this.boxService.form.value.LineId,
        );
        this.boxService.form.reset();
        this.boxService.initializeFormGroup();
        this.notificationService.success(':: box Updated successfully');
        this.onClose();
      }
    }

  }

  ngOnDestroy(): void {
    this.lineSub.unsubscribe();
    this.machineSub.unsubscribe();
  }


}
