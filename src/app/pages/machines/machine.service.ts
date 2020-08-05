import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {MachineModel} from './machine.model';
import {OperationModel} from '../production-management/operation-list/operation.model';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  private machine: MachineModel[] = [];
  private machineUpdated = new Subject<MachineModel[]>();
  private Operations: OperationModel[] = [];
  private OperationsUpdated = new Subject<OperationModel[]>();
  form: FormGroup = new FormGroup({
    machine_id: new FormControl(null),
    machine_label: new FormControl('', Validators.required),
    startworkingdate: new FormControl(new Date()),
    manifacturerlifetime: new FormControl(''),
    LineId: new FormControl(''),
    MachineTypeId: new FormControl(''),
    operation_templates: new FormControl([], Validators.required),
  });

  constructor(private http: HttpClient, private  router: Router) {
  }

  Addmachine(machine_label: string, startworkingdate: Date,
             manifacturerlifetime: string, LineId: string,
             MachineTypeId: string, operation_templates: []
  ) {
    const Data = {
      'machine_label': machine_label,
      'startworkingdate': startworkingdate,
      'manifacturerlifetime': manifacturerlifetime,
      'LineId': LineId,
      'MachineTypeId': MachineTypeId,
      'operation_templates': operation_templates

    }
    this.http.post<{ message: string, data: MachineModel }>(BACKEND_URL + '/api/machine/add', Data)
      .subscribe((responseData) => {
        const Machine: MachineModel = {
          machine_id: responseData.data.machine_id,
          machine_label: machine_label,
          startworkingdate: startworkingdate,
          manifacturerlifetime: manifacturerlifetime,
          LineId: LineId,
          MachineTypeId: MachineTypeId,
          line: responseData.data.line,
          machine_type: responseData.data.machine_type,
          operation_templates: operation_templates

        }
        this.machine.push(Machine);
        this.machineUpdated.next([...this.machine]);
        this.router.navigate(['/admin/lines/MachineList']);

      });
  }

  getmachine() {
    this.http.get<{ message: string, data: MachineModel[] }>(BACKEND_URL + '/api/machine/find')
      .pipe(map((machineData) => {
        return machineData.data.map(machine => {
          return {
            machine_id: machine.machine_id,
            machine_label: machine.machine_label,
            startworkingdate: machine.startworkingdate,
            manifacturerlifetime: machine.manifacturerlifetime,
            LineId: machine.LineId,
            MachineTypeId: machine.MachineTypeId,
            line: machine.line,
            machine_type: machine.machine_type,
            operation_templates: machine.operation_templates


          };
        });
      }))
      .subscribe((transformedmachine) => {

        this.machine = transformedmachine;
        this.machineUpdated.next([...this.machine]);

      });
  }

  populateForm(machine) {
    this.form.patchValue(machine);
  }

  getmachineUpdateListner() {
    return this.machineUpdated.asObservable();
  }

  Deletemachine(machine_id: String) {
    this.http.delete(BACKEND_URL + '/api/machine/delete/' + machine_id).subscribe(
      () => {
        const updatedmachine = this.machine.filter(machine => machine.machine_id !== machine_id);
        this.machine = updatedmachine;
        this.machineUpdated.next([...this.machine]);
      }
    );
  }

  Updatemachine(machine_id: string, machine_label: string,
                startworkingdate: Date, manifacturerlifetime: string,
                LineId: string, MachineTypeId: string,
                operation_templates: []
  ) {

    const machineData = {
      machine_id: machine_id,
      machine_label: machine_label,
      startworkingdate: startworkingdate,
      manifacturerlifetime: manifacturerlifetime,
      LineId: LineId,
      MachineTypeId: MachineTypeId,
      operation_templates: operation_templates

    }
    this.http.put<{ message: string, data: MachineModel }>(BACKEND_URL + '/api/machine/update/' + machine_id, machineData)
      .subscribe(responseData => {
        const Updatedmachine = [...this.machine];
        const oldmachineIndex = Updatedmachine.findIndex(s => s.machine_id === machine_id);
        const machine: MachineModel = {
          machine_id: machine_id,
          machine_label: machine_label,
          startworkingdate: startworkingdate,
          manifacturerlifetime: manifacturerlifetime,
          LineId: LineId,
          MachineTypeId: MachineTypeId,
          line: responseData.data.line,
          machine_type: responseData.data.machine_type,
          operation_templates: operation_templates

        };
        Updatedmachine[oldmachineIndex] = machine;
        this.machine = Updatedmachine;
        this.machineUpdated.next([...this.machine]);
        this.router.navigate(['/admin/lines/MachineList']);


      })

  }

  initializeFormGroup() {
    this.form.setValue({
      'machine_id': null,
      'machine_label': '',
      'startworkingdate': new Date(),
      'manifacturerlifetime': '',
      'LineId': '',
      'MachineTypeId': '',
      'operation_templates': []


    });
  }


  getOperationsByType(MachineType: string) {
    this.http.get<{ message: string, data: any }>(BACKEND_URL + '/api/operation_template/find')
      .pipe(map((Data) => {
        return Data.data.map(operation => {
          return {
            operation_template_id: operation.operation_template_id,
            label: operation.label,
            op_code: operation.op_code,
            description: operation.description,
            MachineTypeId: operation.MachineTypeId,
            machine_type : operation.machine_type,
            time: operation.time,
            accMinPrice: operation.accMinPrice,
            with_subsequence: operation.with_subsequence
          };
        });
      }))
      .subscribe((transformedoperations) => {
        const Updatedoperations = transformedoperations.filter(operation => {
          return operation.MachineTypeId == MachineType
        });
        this.Operations = Updatedoperations;
        this.OperationsUpdated.next([...this.Operations]);

      });

  }

  getOperationsUpdateListner() {
    return this.OperationsUpdated.asObservable();

  }
}
