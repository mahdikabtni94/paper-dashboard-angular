import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {OrderModel} from './order.model';
import {Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {BundleModel} from './bundle.model';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: OrderModel[] = [];
  private ordersUpdated = new Subject<OrderModel[]>();
  form: FormGroup = new FormGroup({
    order_id: new FormControl(null),
    order_label: new FormControl('', Validators.required),
    order_code: new FormControl(''),
    order_description: new FormControl(''),
    ArticleId: new FormControl('', Validators.required),
    CustomerId: new FormControl('', Validators.required),

  });

  constructor(private http: HttpClient, private  router: Router) {
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
           order_description: string, ArticleId: string,
           CustomerId: string, bundles: any[]) {

    const Data = {
      'order_label': order_label,
      'order_code': order_code,
      'order_description': order_description,
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
          article: responseData.data.article,
          customer: responseData.data.customer,
          bundles: bundles


        };
        this.orders.push(order);
        this.ordersUpdated.next([...this.orders]);
       // this.router.navigate(['/admin/bundles/AddOrderWBundles']);

      });
  }

  Updateorder(order_id: string, order_label: string,
              order_code: string, order_description: string,
              CustomerId: string, ArticleId: string,
              bundles: []
  ) {

    const orderData = {
      order_id: order_id,
      order_label: order_label,
      order_code: order_code,
      order_description: order_description,
      CustomerId: CustomerId,
      ArticleId: ArticleId,
      bundles: bundles

    };
    this.http.put<{ message: string, data: OrderModel }>
    (BACKEND_URL + '/api/order/update/' + order_id, orderData)
      .subscribe(responseData => {
        const Updatedorders = [...this.orders];
        const oldUserIndex = Updatedorders.findIndex(p => p.order_id === order_id);
        const order: OrderModel = {
          order_id: order_id,
          order_label: order_label,
          order_code: order_code,
          order_description: order_description,
          ArticleId: ArticleId,
          CustomerId: CustomerId,
          article: responseData.data.article,
          customer: responseData.data.customer,
          bundles: bundles

        };
        Updatedorders[oldUserIndex] = order;
        this.orders = Updatedorders;
        this.ordersUpdated.next([...this.orders]);
     //   this.router.navigate(['admin/production/orderList']);


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
}
