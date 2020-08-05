import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {BundleModel} from './bundle.model';
import {Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {GroupOp} from './operationGroup.model';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BundleService {
  private bundles: BundleModel[] = [];
  private bundlesUpdated = new Subject<BundleModel[]>();
  form: FormGroup = new FormGroup({
    bundle_id: new FormControl(null),
    num_bundle: new FormControl('', Validators.required),
    code: new FormControl(''),
    version: new FormControl(''),
    size: new FormControl(''),
    quantity: new FormControl(''),
    OrderId: new FormControl(''),

  });
  OperationLineForm: FormGroup = new FormGroup({
    LineId: new FormControl(''),
    operations: new FormControl([]),

  });


  constructor(private http: HttpClient, private  router: Router) {
  }

  getbundles() {
    this.http.get<{ message: string, data: any }>(BACKEND_URL + '/api/bundle/find')
      .pipe(map((bundleData) => {
        return bundleData.data.map(bundle => {
          return {
            bundle_id: bundle.bundle_id,
            num_bundle: bundle.num_bundle,
            code: bundle.code,
            version: bundle.version,
            size: bundle.size,
            quantity: bundle.quantity,
            OrderId: bundle.OrderId,
            LineId: bundle.LineId,
            order: bundle.order,
            line: bundle.line

          };
        });
      }))
      .subscribe((transformedbundles) => {
        this.bundles = transformedbundles;
        this.bundlesUpdated.next([...this.bundles]);

      });
  }

  getbundlesUpdateListner() {
    return this.bundlesUpdated.asObservable();
  }

  Addbundle(num_bundle: string, code: string, version: string,
            size: string, quantity: string,
            OrderId: string, Operations_group: GroupOp[]) {

    const Data = {
      'num_bundle': num_bundle,
      'code': code,
      'version': version,
      'size': size,
      'quantity': quantity,
      'OrderId': OrderId,
      'Operations_group': Operations_group

    };
    this.http.post<{ message: string, data: any }>(BACKEND_URL + '/api/bundle/add', Data)
      .subscribe((responseData) => {
        const bundle: any = {
          bundle_id: responseData.data.bundle_id,
          num_bundle: num_bundle,
          code: code,
          version: version,
          size: size,
          quantity: quantity,
          OrderId: OrderId,
          order: responseData.data.order,
          lines: responseData.data.lines,
          operations: responseData.data.operations,

        };
        this.bundles.push(bundle);
        this.bundlesUpdated.next([...this.bundles]);
        this.router.navigate(['/admin/bundles/AddbundleWBundles']);

      });
  }

  Updatebundle(bundle_id: string, num_bundle: string, code: string,
               version: string, size: string,
               quantity: string, OrderId: string,
               Operations_group: GroupOp[],
  ) {

    const bundleData = {
      bundle_id: bundle_id,
      num_bundle: num_bundle,
      code: code,
      version: version,
      size: size,
      quantity: quantity,
      OrderId: OrderId,
      Operations_group: Operations_group

    };
    this.http.put<{ message: string, data: BundleModel }>
    (BACKEND_URL + '/api/bundle/update/' + bundle_id, bundleData)
      .subscribe(responseData => {
        const Updatedbundles = [...this.bundles];
        const oldUserIndex = Updatedbundles.findIndex(p => p.bundle_id === bundle_id);
        const bundle: any = {
          bundle_id: bundle_id,
          num_bundle: num_bundle,
          code: code,
          version: version,
          size: size,
          quantity: quantity,
          OrderId: OrderId,
          order: responseData.data.order,
          lines: responseData.data.lines,
          operations: responseData.data.operations

        };
        Updatedbundles[oldUserIndex] = bundle;
        this.bundles = Updatedbundles;
        this.bundlesUpdated.next([...this.bundles]);
        this.router.navigate(['admin/production/bundleList']);


      })

  }

  Deletebundle(bundleid: String) {
    this.http.delete(BACKEND_URL + '/api/bundle/delete/' + bundleid).subscribe(
      () => {
        const updatedbundle = this.bundles.filter(bundle => bundle.bundle_id !== bundleid);
        this.bundles = updatedbundle;
        this.bundlesUpdated.next([...this.bundles]);
      }
    );
  }

  populateForm(bundle) {
    setTimeout(() => {
      this.form.patchValue(bundle);
    });
  }

  initializeFormGroup() {
    this.form.patchValue({
      'bundle_id': null,
      'num_bundle': '',
      'code': '',
      'version': '',
      'size': '',
      'quantity': '',
      'OrderId': '',
      'LineId': '',
      'operations': ''

    });
  }
}
