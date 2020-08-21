import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from '../../notification.service';
import {OrderService} from './order.service';
import {BundleService} from './bundle.service';
import {ArticleService} from '../production-management/article-list/article.service';
import {CustomerService} from '../../customers/customer.service';
import {Subscription} from 'rxjs';
import {ArticleModel} from '../production-management/article-list/article.model';
import {CustomerModel} from '../../customers/customer.model';
import {LineModel} from '../lines/line.model';
import {LineService} from '../lines/line.service';
import {OperationModel} from '../production-management/operation-list/operation.model';
import {BundleModel} from './bundle.model';
import {GroupOp} from './operationGroup.model';

@Component({
  selector: 'app-order-bundle',
  templateUrl: './order-bundle.component.html',
  styleUrls: ['./order-bundle.component.scss']
})
export class OrderBundleComponent implements OnInit, OnDestroy {
  bundle = new BundleModel();
  Operation_group = new GroupOp();
  articles: ArticleModel[] = [];
  private articleSub: Subscription;
  customers: CustomerModel[] = [];
  private customerSub: Subscription;
  lines: LineModel[] = [];
  private lineSub: Subscription;
  private operationsSub: Subscription;
  private selectedAll: boolean;
  private operation_templates: OperationModel[];
  public range = [];
  public index = 0;


  constructor(public orderService: OrderService, public lineService: LineService,
              public notificationService: NotificationService, private bundleService: BundleService,
              public articleService: ArticleService, public  customerService: CustomerService,
              private cd: ChangeDetectorRef,
  ) {


  }

  ngOnInit() {
    this.bundle.Operations_group = [];
    this.Operation_group = new GroupOp({});
    this.bundle.Operations_group.push(this.Operation_group);
    this.range.push(this.bundle);
    console.log('bundleeeeeeeeeeee', this.range);
    this.customerService.getCustomers();
    this.customerSub = this.customerService.getCustomerUpdateListner()
      .subscribe((customers: CustomerModel[]) => {
        this.customers = customers;
      });
    this.articleService.getArticles();
    this.articleSub = this.articleService.getarticlesUpdateListner()
      .subscribe((articles: ArticleModel[]) => {
        this.articles = articles;

      });
    this.lineService.getLines();
    this.lineSub = this.lineService.getlineUpdateListner()
      .subscribe((lines: LineModel[]) => {
        this.lines = lines;

      });

  }

  public onSelectAll(i, groupIndex) {
    if (this.selectedAll === true) {
      const selected = this.operation_templates.map(item => item.operation_template_id);
      console.log('operation*************', selected);
      this.range[i].Operations_group[groupIndex].operations = selected;
    } else {
      const selected = [];
      this.range[i].Operations_group[groupIndex].operations = selected;
      console.log('false', selected)
    }
  }

  addArticleOperationTemplate = (term) => ({operation_template_id: term, label: term});

  add() {
    setTimeout(() => {
      this.bundle = new BundleModel({});
      this.bundle.Operations_group = [];
      this.Operation_group = new GroupOp({});
      this.bundle.Operations_group.push(this.Operation_group);
      this.range.push(this.bundle);
      this.cd.detectChanges();
    }, 0);


  }

  addOperationGroup(i) {
    this.Operation_group = new GroupOp({});
    this.range[i].Operations_group.push(this.Operation_group);

  }

  removeOperationsGroup(i, groupeIndex) {
    this.range[i].Operations_group.splice(groupeIndex, 1);

  }

  cloneBundle(i) {
    let data = JSON.stringify(this.range[i]);
    data = JSON.parse(data);
    const new_bundle = new BundleModel({});
    const currentBundle = Object.assign(new_bundle, data);
    this.range.push(currentBundle);
  }

  remove(i) {
    this.range.splice(i, 1);
    console.log(this.range);

  }


  onSubmit() {
    for (const i in this.range) {
      if (this.range[i].Operations_group) {
        for (const groupIndex in this.range[i].Operations_group) {
          if (this.range[i].Operations_group[groupIndex]) {
            const selectedOperations = this.operation_templates.filter(
              // tslint:disable-next-line:triple-equals
              operation => operation.operation_template_id !== this.range[i].Operations_group);
            const operationCopyList = selectedOperations.map(function (operation) {
              return {
                // operation_id: operation.operation_template_id,
                label: operation.label,
                op_code: operation.op_code,
                description: operation.description,
                MachineTypeId: operation.MachineTypeId,
                machine_type: operation.machine_type,
                time: operation.time,
                accMinPrice: operation.accMinPrice,

              }
            });
            this.range[i].Operations_group[groupIndex].operations = operationCopyList;
            console.log('selected operations', operationCopyList);
            console.log('range**********', this.range);

          }
        }
      }
    }
    this.orderService.Addorder(
      this.orderService.form.value.order_label,
      this.orderService.form.value.order_code,
      this.orderService.form.value.order_description,
      this.orderService.form.value.quantity,
      this.orderService.form.value.ArticleId,
      this.orderService.form.value.CustomerId,
      this.range,
    );
    this.orderService.form.reset();
    this.orderService.initializeFormGroup();
    this.notificationService.success(':: Order Added successfully');
    console.log('orderform*****', this.orderService.form.value);

  }

  onSelectArticle(article: string) {
    this.articleService.FindOperationsByArticleId(article);
    this.operationsSub = this.articleService.getOperationsUpdateListner()
      .subscribe((operations: OperationModel[]) => {
        this.operation_templates = operations;

      });

  }

  ngOnDestroy(): void {
    if (this.lineSub && !this.lineSub.closed) {
      this.lineSub.unsubscribe()
    }
    if (this.operationsSub && !this.operationsSub.closed) {
      this.operationsSub.unsubscribe()
    }
    if (this.articleSub && !this.articleSub.closed) {
      this.articleSub.unsubscribe()
    }
    if (this.customerSub && !this.customerSub.closed) {
      this.customerSub.unsubscribe()
    }
  }

}
