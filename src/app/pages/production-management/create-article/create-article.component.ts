import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {OperationModel} from '../operation-list/operation.model';
import {MatDialogRef} from '@angular/material';
import {NotificationService} from '../../../notification.service';
import {ArticleService} from '../article-list/article.service';
import {OperationService} from '../operation-list/operation.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit, OnDestroy {
  private operationsSub: Subscription;
  private selectedAll: boolean;
  private operation_templates: OperationModel[];
  selectedOpeartionTemplateIds: string[];


  constructor(public dialogref: MatDialogRef<CreateArticleComponent>,
              public articleService: ArticleService,
              public notificationService: NotificationService,
              private operationService: OperationService,
  ) {
  }

  ngOnInit() {
    this.operationService.getOperations();
    this.operationsSub = this.operationService.getOperationsUpdateListner()
      .subscribe((operations: OperationModel[]) => {
        this.operation_templates = operations;

      });
  }

  onClear() {
    this.operationService.form.reset();
    this.notificationService.success(':: Form Cleared');
  }

  onClose() {
    this.operationService.form.reset();
    // this.articleService.initializeFormGroup();
    this.dialogref.close();
  }

  onSavearticle() {
    if (this.articleService.form.valid) {
      if (!this.articleService.form.get('article_id').value) {

        this.articleService.Addarticle(
          this.articleService.form.value.article_name,
          this.articleService.form.value.code,
          this.articleService.form.value.description,
          this.articleService.form.value.operation_templates,
        );

        this.notificationService.success(':: article Added successfully');
        this.onClose();
      } else {
        this.articleService.UpdateArticle(
          this.articleService.form.value.article_id,
          this.articleService.form.value.article_name,
          this.articleService.form.value.code,
          this.articleService.form.value.description,
          this.articleService.form.value.operation_templates,
        );
        this.notificationService.success(':: article Updated successfully');
        this.onClose();
        location.reload();

      }
    }

  }

  ngOnDestroy(): void {
    this.operationsSub.unsubscribe();
  }

  public onSelectAll() {
    if (this.selectedAll === true) {
      const selected = this.operation_templates.map(item => item.operation_template_id);
      this.articleService.form.get('operation_templates').patchValue(selected);
    } else {
      const selected = [];
      this.articleService.form.get('operation_templates').patchValue(selected);
      console.log('false', selected)
    }
  }

  addArticleOperationTemplate = (term) => ({operation_template_id: term, label: term});


}
