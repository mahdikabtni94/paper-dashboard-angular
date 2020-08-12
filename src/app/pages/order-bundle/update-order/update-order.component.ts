import {Component, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {Subscription} from 'rxjs';
import {OperationModel} from '../../production-management/operation-list/operation.model';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.scss']
})
export class UpdateOrderComponent implements OnInit {
  public keyword = 'order_code';
  public orderList = [];
  private orderCode: string | object;
  private ArticleId: string;
  private order = null;
  private orderSub: Subscription;
  private orderSearched: Subscription;
  private linesChosen: string[];
  isLoadingResult: boolean;
  private lines = [];
  private operation_templates: OperationModel[] = [];
  private selectedAll: boolean;
  selectedOpeartionTemplateIds: string[];
  linesOperations = [];
  nextPressed = false;
  BundleForm: FormGroup;
  bundles: FormArray;

  constructor(private orderService: OrderService, private formBuilder: FormBuilder) {


  }

  ngOnInit() {
    this.orderService.getorders();
    this.orderSub = this.orderService.getordersUpdateListner().subscribe(
      (orders) => {
        this.orderList = orders
      }
    );
    this.BundleForm = this.formBuilder.group({
      items: this.formBuilder.array([this.createItem()])
    });

  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      size: '',
      quantity: '',
      code: '',
      num_bundle: '',
      numOfBundles: '',
    });
  }

  addItem(): void {
    this.bundles = this.BundleForm.get('items') as FormArray;
    this.bundles.push(this.createItem());
  }

  ShowInput($event: any) {
    this.isLoadingResult = true;
    console.log('orderCode', this.orderCode);
    this.isLoadingResult = false;

  }

  findOrder(orderCode: string | any) {
    this.order = null;
    if (typeof (orderCode) === 'object') {
      this.orderCode = orderCode.order_code;
      console.log('awwaaaaaaaaaaa', this.orderCode)
    }
    this.orderSearched = this.orderService.FindOrderByCode(orderCode).subscribe((order) => {
      this.order = order.order;
      this.ArticleId = order.order.article.article_id;
      this.lines = order.lines;
      this.operation_templates = order.operations;
      this.selectedOpeartionTemplateIds = this.operation_templates.map(item => item.operation_template_id);
      console.log('orderSearched', this.order);
      console.log('lines', this.lines);
      console.log('operations', this.operation_templates);
    });


  }

  public onSelectAll() {
    if (this.selectedAll === true) {
      const selected = this.lines.map(item => item.line_id);
      this.linesChosen = selected;
      console.log('lineschosen', this.linesChosen);
    } else {
      const selected = [];
      this.linesChosen = selected;
      console.log('false', selected)
    }
  }

  addArticleLineTemplate = (term) => ({line_id: term, line_label: term});
  addArticleOperationTemplate = (term) => ({operation_template_id: term, label: term});
  addlineOperationGroupItem = (term) => ({operation_id: term, label: term});

  getSelectedLines() {
    this.linesOperations = this.lines.filter(
      line => this.linesChosen.includes(line.line_id));
    this.linesOperations = this.linesOperations.map(function (lineOperation) {
      return {
        line_id: lineOperation.line_id,
        line_label: lineOperation.line_label,
        line_description: lineOperation.line_description,
        SiteId: lineOperation.SiteId,
        operations: lineOperation.operations,
        operationsUpdated: [],
        selectAll: false,
      }
    });
    console.log('lineOPPPPPPPPP', this.linesOperations);

  }

  onSelectAllOperationsLine(index) {
    this.linesOperations[index].selectAll = !this.linesOperations[index].selectAll;
    if (this.linesOperations[index].selectAll === true) {
      const selected = this.linesOperations[index].operations.map(item => item.operation_id);
      this.linesOperations[index].operationsUpdated = selected;
      console.log('operationsUpdated', this.linesOperations[index].operationsUpdated)
    } else {
      const selected = [];
      this.linesOperations[index].operationsUpdated = selected
    }

  }

  nextpage() {
    this.nextPressed = true;
  }

  previousPage() {
    this.nextPressed = false;

  }
}
