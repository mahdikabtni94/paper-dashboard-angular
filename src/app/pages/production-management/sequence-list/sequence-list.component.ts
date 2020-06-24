import {Component, OnInit} from '@angular/core';
import {SequenceService} from './sequence.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {SequenceModel} from './sequence.model';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {NotificationService} from '../../../notification.service';
import {DialogService} from '../../../dialog.service';
import {CreateSequenceComponent} from '../create-sequence/create-sequence.component';

@Component({
  selector: 'app-sequence-list',
  templateUrl: './sequence-list.component.html',
  styleUrls: ['./sequence-list.component.scss']
})
export class SequenceListComponent implements OnInit {
  private operationId: string;
  isloading = false;
  sequences: SequenceModel[] = [];
  sequenceSub: Subscription;

  constructor(public sequenceService: SequenceService,
              public  route: ActivatedRoute,
              private  dialog: MatDialog,
              private notificationService: NotificationService,
              private  dialogService: DialogService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.operationId = paramMap.get('id');
        this.isloading = true;
        this.sequenceService.getSequences(this.operationId);
        this.sequenceSub = this.sequenceService.getSequencesUpdateListner()
          .subscribe((sequences: SequenceModel[]) => {
            this.isloading = false;
            this.sequences = sequences;

          });

      } else {
        this.operationId = null;
      }

    });

  }

  onDelete(row: any) {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this Sequence ?').afterClosed()
      .subscribe(res => {
        if (res) {
          this.sequenceService.DeleteSequence(row);
          this.notificationService.warn(' Deleted successfully!!');
        }
      });

  }

  onEdit(row: any) {
    this.sequenceService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '78%';
    dialogConfig.position = {
      right: '30px'
    };
    dialogConfig.height = '60%';
    dialogConfig.data = {
      opkey: this.operationId
    }
    this.dialog.open(CreateSequenceComponent, dialogConfig);
  }

  onCreate() {
    this.sequenceService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '78%';
    dialogConfig.position = {
      right: '30px'
    };
    dialogConfig.height = '60%';
    dialogConfig.data = {
      opkey: this.operationId
    }
    this.dialog.open(CreateSequenceComponent, dialogConfig);

  }

}
