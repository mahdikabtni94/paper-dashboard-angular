import {environment} from '../../../../environments/environment';
import {Injectable} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {OperationModel} from './operation.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  private operations: OperationModel[] = [];
  private operationsUpdated = new Subject<OperationModel[]>();
  form: FormGroup = new FormGroup({
    operation_template_id: new FormControl(null),
    label: new FormControl('', Validators.required),
    op_code: new FormControl('', Validators.required),
    description: new FormControl(''),
    MachineTypeId: new FormControl('', Validators.required),
    time: new FormControl(''),
    accMinPrice: new FormControl(''),
    with_subsequence: new FormControl(false),
  });

  constructor(private http: HttpClient, private  router: Router) {

  }

  getOperations() {
    this.http.get<{ message: string, data: OperationModel[] }>(BACKEND_URL + '/api/operation_template/find')
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
  }

  getOperationsUpdateListner() {
    return this.operationsUpdated.asObservable();
  }

  getOperation(id: string) {
    return this.http.get<{ message: string, data: OperationModel }>(BACKEND_URL + '/api/operation_template/find/' + id)

  }

  AddOperation(label: string,
               op_code: string, MachineTypeId: string,
               description: string,
               time: string, accMinPrice: string,
               with_subsequence: boolean
  ) {

    const Data = {
      'label': label,
      'op_code': op_code,
      'MachineTypeId': MachineTypeId,
      'description': description,
      'time': time,
      'accMinPrice': accMinPrice,
      'with_subsequence': with_subsequence,

    }
    this.http.post<{ message: string, data: OperationModel }>(BACKEND_URL + '/api/operation_template/add', Data)
      .subscribe((responseData) => {
        const operation: OperationModel = {
          operation_template_id: responseData.data.operation_template_id,
          label: label,
          op_code: op_code,
          MachineTypeId: MachineTypeId,
          description: description,
          time: time,
          accMinPrice: accMinPrice,
          with_subsequence: with_subsequence,
          machine_type: responseData.data.machine_type,
        }
        this.operations.push(operation);
        this.operationsUpdated.next([...this.operations]);
        this.router.navigate(['/admin/production/OperationList']);

      });
  }

  UpdateOperation(operation_template_id: string, label: string,
                  op_code: string, description: string,
                  MachineTypeId: string,
                  time: string, accMinPrice: string,
                  with_subsequence: boolean) {

    const OperationData = {
      operation_template_id: operation_template_id,
      label: label,
      op_code: op_code,
      MachineTypeId: MachineTypeId,
      description: description,
      time: time,
      accMinPrice: accMinPrice,
      with_subsequence: with_subsequence,
    }
    this.http.put<{ message: string, data: OperationModel }>
    (BACKEND_URL + '/api/operation_template/update/' + operation_template_id, OperationData)
      .subscribe(responseData => {
        const UpdatedOperations = [...this.operations];
        const oldUserIndex = UpdatedOperations.findIndex(p => p.operation_template_id === operation_template_id);
        const operation: OperationModel = {
          operation_template_id: operation_template_id,
          label: label,
          op_code: op_code,
          MachineTypeId: MachineTypeId,
          description: description,
          time: time,
          accMinPrice: accMinPrice,
          with_subsequence: with_subsequence,
          machine_type: responseData.data.machine_type,


        }
        UpdatedOperations[oldUserIndex] = operation;
        this.operations = UpdatedOperations;
        this.operationsUpdated.next([...this.operations]);
        this.router.navigate(['admin/production/OperationList']);


      })

  }

  DeleteOperation(Operationid: String) {
    this.http.delete(BACKEND_URL + '/api/operation_template/delete/' + Operationid).subscribe(
      () => {
        const updatedOperation = this.operations.filter(operation => operation.operation_template_id !== Operationid);
        this.operations = updatedOperation;
        this.operationsUpdated.next([...this.operations]);
      }
    );
  }

  populateForm(operation) {
    this.form.patchValue(operation);
  }


  initializeFormGroup() {
    this.form.patchValue({
      'operation_template_id': null,
      'label': '',
      'op_code': '',
      'MachineTypeId': '',
      'time': '',
      'description': '',
      'accMinPrice': '',
      'with_subsequence': false,

    });
  }

}
