import {Component, OnDestroy, OnInit} from '@angular/core';
import {SiteModel} from '../../sites/site.model';
import {Subscription} from 'rxjs';
import {MatDialogRef} from '@angular/material';
import {SitesService} from '../../sites/sites.service';
import {NotificationService} from '../../../notification.service';
import {MachineModel} from '../../machines/machine.model';
import {BoxService} from '../boxes.service';
import {MachineService} from '../../machines/machine.service';

@Component({
  selector: 'app-create-box',
  templateUrl: './create-box.component.html',
  styleUrls: ['./create-box.component.scss']
})
export class CreateBoxComponent implements OnInit, OnDestroy {

  sites: SiteModel[];
  machines: MachineModel[];
  private siteSub: Subscription;
  private machineSub: Subscription;

  constructor(public dialogref: MatDialogRef<CreateBoxComponent>,
              public boxService: BoxService,
              public siteService: SitesService,
              public machineService: MachineService,
              public notificationService: NotificationService) {
  }

  ngOnInit() {
    this.siteService.getSites();
    this.siteSub = this.siteService.getSiteUpdateListner()
      .subscribe((sites: SiteModel[]) => {
        this.sites = sites;

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
          this.boxService.form.value.SiteId,
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
          this.boxService.form.value.SiteId,
        );
        this.boxService.form.reset();
        this.boxService.initializeFormGroup();
        this.notificationService.success(':: box Updated successfully');
        this.onClose();
      }
    }

  }

  ngOnDestroy(): void {
    this.siteSub.unsubscribe();
    this.machineSub.unsubscribe();
  }


}
