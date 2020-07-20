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
import {OperationService} from '../production-management/operation-list/operation.service';
import {BundleModel} from './bundle.model';

@Component({
  selector: 'app-order-bundle',
  templateUrl: './order-bundle.component.html',
  styleUrls: ['./order-bundle.component.scss']
})
export class OrderBundleComponent implements OnInit, OnDestroy {
  bundle = new BundleModel();
  articles: ArticleModel[] = [];
  private articleSub: Subscription;
  customers: CustomerModel[] = [];
  private customerSub: Subscription;
  lines: LineModel[] = [];
  private lineSub: Subscription;
  private operationsSub: Subscription;
  private selectedAll: boolean;
  private operation_templates: OperationModel[];
  selectedOpeartionTemplateIds: string[];
  public range = [];
  public index = 0;

  constructor(public orderService: OrderService, public lineService: LineService,
              public notificationService: NotificationService, private bundleService: BundleService,
              public articleService: ArticleService, public  customerService: CustomerService,
              public operationService: OperationService, private cd: ChangeDetectorRef
  ) {


  }

  ngOnInit() {

    this.range.push(this.bundle);
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
    this.operationService.getOperations();
    this.operationsSub = this.operationService.getOperationsUpdateListner()
      .subscribe((operations: OperationModel[]) => {
        this.operation_templates = operations;

      });
  }

  public onSelectAll() {
    if (this.selectedAll === true) {
      const selected = this.operation_templates.map(item => item.operation_template_id);
      console.log('operation*************', selected);
      this.bundleService.form.get('operations').patchValue(selected);
    } else {
      const selected = [];
      this.bundleService.form.get('operations').patchValue(selected);
      console.log('false', selected)
    }
  }

  addArticleOperationTemplate = (term) => ({operation_template_id: term, label: term});

  add() {
    setTimeout(() => {
      this.bundle = new BundleModel({});
      this.range.push(this.bundle);
      this.cd.detectChanges();
    }, 0);


  }

  remove(i) {
    this.range.splice(i, 1);
    console.log(this.range);

  }


  onSubmit() {
    const selectedOperations = this.operation_templates.filter(
      // tslint:disable-next-line:triple-equals
      operation => operation.operation_template_id !== this.bundleService.form.value.operations);
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
    for (const i in this.range) {
      if (this.range[i].operations) {
        this.range[i].operations = operationCopyList;

      }
    }
    //  this.bundleService.form.value.operations = selectedOperations;
    // const Selectedop =  this.bundleService.form.value.operations;
    console.log('selected operations', operationCopyList);
    console.log('range**********', this.range);
      this.orderService.Addorder(
        this.orderService.form.value.order_label,
        this.orderService.form.value.order_code,
        this.orderService.form.value.order_description,
        this.orderService.form.value.ArticleId,
        this.orderService.form.value.CustomerId,
        this.range,
      );
    this.orderService.form.reset();
    this.orderService.initializeFormGroup();
    this.bundleService.form.reset();
    this.bundleService.initializeFormGroup();
    this.notificationService.success(':: Order Added successfully');
    console.log('orderform*****', this.orderService.form.value);


  }


  /*cloneBundle(i) {
    this.index = i++;
    this.range.push(i);
  }
*/
  ngOnDestroy(): void {
    this.lineSub.unsubscribe();
    this.articleSub.unsubscribe();
    this.operationsSub.unsubscribe();
    this.customerSub.unsubscribe();
  }


}
