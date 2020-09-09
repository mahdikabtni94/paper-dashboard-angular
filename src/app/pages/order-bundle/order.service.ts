import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {OrderModel} from './order.model';
import {Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {BundleModel} from './bundle.model';
import {OperationModel} from '../production-management/operation-list/operation.model';
import {LineModel} from '../lines/line.model';
import {NotificationService} from '../../notification.service';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: OrderModel[] = [];
  private ordersUpdated = new Subject<OrderModel[]>();
  private operationsUpdated = new Subject<OperationModel[]>();
  private lineOperations: any[] = [];
  private lineOperationsUpdated = new Subject<any[]>();
  form: FormGroup = new FormGroup({
    order_id: new FormControl(null),
    order_label: new FormControl('', Validators.required),
    order_code: new FormControl('', Validators.required),
    order_description: new FormControl(''),
    quantity: new FormControl('', Validators.required),
    ArticleId: new FormControl('', Validators.required),
    CustomerId: new FormControl('', Validators.required),

  });
  UpdatedOrderForm: FormGroup = new FormGroup({
    ArticleId: new FormControl({value: '', disabled: true}),
    addedQuantity: new FormControl(''),
  });

  constructor(private http: HttpClient, private  router: Router, private notification: NotificationService) {
  }

  getorders() {
    this.http.get<{ message: string, data: any }>(BACKEND_URL + '/api/order/find')
      .pipe(map((orderData) => {
        return orderData.data.map(order => {
          return {
            order_id: order.order_id,
            order_label: order.order_label,
            order_code: order.order_code,
            order_description: order.order_description,
            order_name: order.order_name,
            quantity: order.quantity,
            ArticleId: order.ArticleId,
            CustomerId: order.CustomerId,
            article: order.article,
            customer: order.customer,
            bundles: order.bundles,

          };
        });
      }))
      .subscribe((transformedorders) => {
        this.orders = transformedorders;
        this.ordersUpdated.next([...this.orders]);

      });
  }

  getordersUpdateListner() {
    return this.ordersUpdated.asObservable();
  }

  Addorder(order_label: string, order_code: string,
           order_description: string, quantity: string,
           ArticleId: string,
           CustomerId: string, bundles: BundleModel[]) {

    const Data = {
      'order_label': order_label,
      'order_code': order_code,
      'order_description': order_description,
      'quantity': quantity,
      'ArticleId': ArticleId,
      'CustomerId': CustomerId,
      'bundles': bundles

    };
    this.http.post<{ message: string, data: OrderModel }>(BACKEND_URL + '/api/order/addOrderWbundle', Data)
      .subscribe((responseData) => {
          const order: OrderModel = {
            order_id: responseData.data.order_id,
            order_label: order_label,
            order_code: order_code,
            order_description: order_description,
            ArticleId: ArticleId,
            CustomerId: CustomerId,
            quantity: quantity,
            article: responseData.data.article,
            customer: responseData.data.customer,
            bundles: bundles


          };
          this.orders.push(order);
          this.ordersUpdated.next([...this.orders]);
          this.notification.success(':: Order Added successfully');
          this.router.navigate(['/admin/updateOrder']);

        },
        (err: HttpErrorResponse) => {
          this.notification.warn('Operation Failed');

        }
      );
  }

  Updateorder(order_code: string | object, AddedQuantity: string,
              operation_templates: string[], lines: string[],
              lineOperations: any[], bundles: any[]
  ) {

    const orderData = {
      AddedQuantity: AddedQuantity,
      operation_templates: operation_templates,
      lines: lines,
      lineOperations: lineOperations,
      bundles: bundles,
    };
    this.http.put<{ message: string, order: any, article: any }>
    (BACKEND_URL + '/api/order/update/' + order_code, orderData).subscribe(response => {
      const UpdatedOrders = [...this.orders];
      const oldOrderIndex = UpdatedOrders.findIndex(p => p.order_code === order_code);
      UpdatedOrders[oldOrderIndex] = response.order;
      this.orders = UpdatedOrders;
      this.ordersUpdated.next([...this.orders]);
      this.router.navigate(['/admin/BundleList'])

    })

  }

  Deleteorder(orderid: String) {
    this.http.delete(BACKEND_URL + '/api/order/delete/' + orderid).subscribe(
      () => {
        const updatedorder = this.orders.filter(order => order.order_id !== orderid);
        this.orders = updatedorder;
        this.ordersUpdated.next([...this.orders]);
      }
    );
  }

  populateForm(order) {
    setTimeout(() => {
      this.form.patchValue(order);
    });
  }

  initializeFormGroup() {
    this.form.patchValue({
      'order_id': null,
      'order_label': '',
      'order_code': '',
      'order_description': '',
      'ArticleId': '',
      'CustomerId': '',

    });
  }

  initializeUpdatedFormGroup() {
    this.form.patchValue({
      'ArticleId': '',
      'AddedQuantity': '',

    });
  }

  FindOrderByCode(order_code: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.get<{ message: string, order: OrderModel, lines: LineModel[], operations: OperationModel[] }>(BACKEND_URL + '/api/order/findByOrder/' + order_code)

  }


  getOperationUpdateListner() {
    return this.operationsUpdated.asObservable();
  }


  FindOperationsByLine(line_id: string) {
    this.http.get<{ message: string, data: any[] }>(BACKEND_URL + '/api/article/findOperationsById/' + line_id)
      .pipe(map((operationData) => {
        return operationData.data.map(operation => {
          return {
            operation_id: operation.operation_id,
            label: operation.label,
            op_code: operation.op_code,
            description: operation.description,
            MachineTypeId: operation.MachineTypeId,
            time: operation.time,
            accMinPrice: operation.accMinPrice,
            BundleId: operation.BundleId,
            bundle: operation.bundle,
          };
        });
      }))
      .subscribe((transformedOperations) => {
        this.lineOperations = transformedOperations;
        this.lineOperationsUpdated.next([...this.lineOperations]);

      });
  }

  getLineOperationsUpdateListner() {
    return this.lineOperationsUpdated.asObservable();
  }

  /* FindLinesByArticle(line_id: string) {
    this.http.get<{ message: string, data: any[] }>(BACKEND_URL + '/api/article/findLinesById/' + line_id)
      .pipe(map((lineData) => {
        return lineData.data.map(line => {
          return {
            line_id: line.line_id,
            line_label: line.line_label,
            line_description: line.line_description,
            SiteId: line.SiteId,
            site: line.site,
          };
        });
      }))
      .subscribe((transformedlines) => {
        this.lines = transformedlines;
        this.linesUpdated.next([...this.lines]);

      });
  }

  getLinesUpdateListner() {
    return this.linesUpdated.asObservable();
  }*/
  /*
  FindOperationsByArticle(article_id: string) {
    this.http.get<{ message: string, data: OperationModel[] }>(BACKEND_URL + '/api/article/findOperationsById/' + article_id)
      .pipe(map((operationData) => {
        return operationData.data.map(operation => {
          return {
            operation_template_id: operation.operation_template_id,
            label: operation.label,
            op_code: operation.op_code,
            description: operation.description,
            MachineTypeId: operation.MachineTypeId,
            time: operation.time,
            accMinPrice: operation.accMinPrice,
            with_subsequence: operation.with_subsequence,
            machine_type: operation.machine_type,
          };
        });
      }))
      .subscribe((transformedOperations) => {
        this.operations = transformedOperations;
        this.operationsUpdated.next([...this.operations]);

      });
  }*/


}
