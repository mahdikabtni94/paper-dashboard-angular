import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef, MatSlideToggle} from '@angular/material';
import {NotificationService} from '../../../notification.service';
import {SequenceService} from '../sequence-list/sequence.service';

@Component({
  selector: 'app-create-sequence',
  templateUrl: './create-sequence.component.html',
  styleUrls: ['./create-sequence.component.scss']
})
export class CreateSequenceComponent implements OnInit {
  subscription: Subscription;
  imagePreview: string;
  @ViewChild('slide', {static: false}) MatSlideToggle: MatSlideToggle;

  constructor(
    public dialogref: MatDialogRef<CreateSequenceComponent>,
    @Inject(MAT_DIALOG_DATA) public opkey: any,
    public notificationService: NotificationService,
    public  sequenceService: SequenceService) {


  }

  ngOnInit() {
    console.log(this.opkey.opkey);
    this.sequenceService.form.value.operation_template_id = this.opkey.opkey;
    console.log('operationnnntemmmm', this.opkey.opkey);
    this.imagePreview = this.sequenceService.form.controls['picture'].value;
    this.sequenceService.form.patchValue({with_subsequence: false});

  }


  onClear() {
    this.sequenceService.form.reset();
    this.notificationService.success(':: Form Cleared');

  }

  onClose() {
    this.sequenceService.form.reset();
    this.sequenceService.initializeFormGroup();
    this.dialogref.close();
  }

  onSavesequence() {
    if (this.sequenceService.form.valid) {
      if (!this.sequenceService.form.get('sequence_id').value) {
        this.sequenceService.AddSequence(
          this.sequenceService.form.value.stitchcount,
          this.sequenceService.form.value.sequence_order,
          this.sequenceService.form.value.picture,
          this.sequenceService.form.value.operation_template_id = this.opkey.opkey,
          this.sequenceService.form.value.coupe_fil,
          this.sequenceService.form.value.back_stitch,
          this.sequenceService.form.value.parent_sequence,
          this.sequenceService.form.value.back_stitch_positive_tolerence,
          this.sequenceService.form.value.back_stitch_negative_tolerence,
          this.sequenceService.form.value.stitch_count_positive_tolerence,
          this.sequenceService.form.value.stitch_count_negative_tolerence,
          this.sequenceService.form.value.with_subsequence,
          this.sequenceService.form.value.description,
          this.sequenceService.form.value.second_back_stitch,
        );
        this.sequenceService.initializeFormGroup();
        this.notificationService.success(':: sequence Added successfully');
        this.onClose();
      } else {
        this.sequenceService.UpdateSequence(
          this.sequenceService.form.value.sequence_id,
          this.sequenceService.form.value.stitchcount,
          this.sequenceService.form.value.sequence_order,
          this.sequenceService.form.value.picture,
          this.sequenceService.form.value.operation_template_id = this.opkey.opkey,
          this.sequenceService.form.value.coupe_fil,
          this.sequenceService.form.value.back_stitch,
          this.sequenceService.form.value.parent_sequence,
          this.sequenceService.form.value.back_stitch_positive_tolerence,
          this.sequenceService.form.value.back_stitch_negative_tolerence,
          this.sequenceService.form.value.stitch_count_positive_tolerence,
          this.sequenceService.form.value.stitch_count_negative_tolerence,
          this.sequenceService.form.value.with_subsequence,
          this.sequenceService.form.value.description,
          this.sequenceService.form.value.second_back_stitch,
        );
        this.sequenceService.initializeFormGroup();
        this.notificationService.success(':: sequence Updated successfully');
        this.onClose();
      }
    }
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.sequenceService.form.patchValue({picture: file});
    this.sequenceService.form.get('picture').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = <string>reader.result
    };
    reader.readAsDataURL(file);
    console.log('formmmm', this.sequenceService.form.value);
  }

  OnChange() {

    if (this.MatSlideToggle.checked) {
      this.sequenceService.form.value.with_subsequence = true;
      this.notificationService.success('with subsequences');

    } else {
      this.sequenceService.form.value.with_subsequence = false;
      this.notificationService.warn('no subsequences');
    }

  }
}
