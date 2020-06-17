import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {LineService} from '../line.service';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../../notification.service';
import {SiteModel} from '../../sites/site.model';
import {SitesService} from '../../sites/sites.service';

@Component({
  selector: 'app-create-line',
  templateUrl: './create-line.component.html',
  styleUrls: ['./create-line.component.scss']
})
export class CreateLineComponent implements OnInit, OnDestroy {
  sites: SiteModel[];
  private siteSub: Subscription;

  constructor(public dialogref: MatDialogRef<CreateLineComponent>,
              public lineService: LineService,
              public siteService: SitesService,
              public notificationService: NotificationService) {
  }

  ngOnInit() {
    this.siteService.getSites();
    this.siteSub = this.siteService.getSiteUpdateListner()
      .subscribe((sites: SiteModel[]) => {
        this.sites = sites;

      });
  }

  onClear() {
    this.lineService.form.reset();
    this.notificationService.success(':: Form Cleared');
  }

  onClose() {
    this.lineService.form.reset();
    this.lineService.initializeFormGroup();
    this.dialogref.close();
  }

  onSaveLine() {
    if (this.lineService.form.valid) {
      if (!this.lineService.form.get('line_id').value) {
        this.lineService.Addline(
          this.lineService.form.value.line_label,
          this.lineService.form.value.line_description,
          this.lineService.form.value.SiteId,
        );
        this.lineService.form.reset();
        this.lineService.initializeFormGroup();
        this.notificationService.success(':: line Added successfully');
        this.onClose();
      } else {
        this.lineService.Updateline(
          this.lineService.form.value.line_id,
          this.lineService.form.value.line_label,
          this.lineService.form.value.line_description,
          this.lineService.form.value.SiteId,
        );
        this.lineService.form.reset();
        this.lineService.initializeFormGroup();
        this.notificationService.success(':: line Updated successfully');
        this.onClose();
      }
    }

  }

  ngOnDestroy(): void {
    this.siteSub.unsubscribe();
  }

}
