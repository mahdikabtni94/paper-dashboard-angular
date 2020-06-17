import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {MachineTypeModel} from './machine_type.model';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class MachineTypeTypeService {
  private MachineTypes: MachineTypeModel[] = [];
  private MachineTypesUpdated = new Subject<MachineTypeModel[]>();
  form: FormGroup = new FormGroup({
    machinetype_id: new FormControl(null),
    type: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  constructor(private http: HttpClient, private  router: Router) {
  }

  AddMachineType(type: string, description: string,
  ) {
    const Data = {
      'type': type,
      'description': description,


    }
    this.http.post<{ message: string, data: MachineTypeModel }>(BACKEND_URL + '/api/machinetype/add', Data)
      .subscribe((responseData) => {
        const MachineType: MachineTypeModel = {
          machinetype_id: responseData.data.machinetype_id,
          type: type,
          description: description,

        }
        this.MachineTypes.push(MachineType);
        this.MachineTypesUpdated.next([...this.MachineTypes]);
        this.router.navigate(['/admin/lines/MachineTypeList']);

      });
  }

  getMachineTypes() {
    this.http.get<{ message: string, data: MachineTypeModel[] }>(BACKEND_URL + '/api/machinetype/find')
      .pipe(map((MachineTypeData) => {
        return MachineTypeData.data.map(MachineType => {
          return {
            machinetype_id: MachineType.machinetype_id,
            type: MachineType.type,
            description: MachineType.description,


          };
        });
      }))
      .subscribe((transformedMachineTypes) => {

        this.MachineTypes = transformedMachineTypes;
        this.MachineTypesUpdated.next([...this.MachineTypes]);

      });
  }

  populateForm(MachineType) {
    this.form.patchValue(MachineType);
  }

  getMachineTypeUpdateListner() {
    return this.MachineTypesUpdated.asObservable();
  }

  DeleteMachineType(MachineType_id: String) {
    this.http.delete(BACKEND_URL + '/api/machinetype/delete/' + MachineType_id).subscribe(
      () => {
        const updatedMachineTypes = this.MachineTypes.filter(MachineType => MachineType.machinetype_id !== MachineType_id);
        this.MachineTypes = updatedMachineTypes;
        this.MachineTypesUpdated.next([...this.MachineTypes]);
      }
    );
  }

  UpdateMachineType(MachineType_id: string, type: string,
                    description: string
  ) {

    const MachineTypeData = {
      machinetype_id: MachineType_id,
      type: type,
      description: description,

    }
    this.http.put<{ message: string, data: MachineTypeModel }>(BACKEND_URL + '/api/machinetype/update/' + MachineType_id, MachineTypeData)
      .subscribe(responseData => {
        const UpdatedMachineTypes = [...this.MachineTypes];
        const oldMachineTypesIndex = UpdatedMachineTypes.findIndex(s => s.machinetype_id === MachineType_id);
        const MachineType: MachineTypeModel = {
          machinetype_id: MachineType_id,
          type: type,
          description: description,
        };
        UpdatedMachineTypes[oldMachineTypesIndex] = MachineType;
        this.MachineTypes = UpdatedMachineTypes;
        this.MachineTypesUpdated.next([...this.MachineTypes]);
        this.router.navigate(['/admin/lines/MachineTypeList']);


      })

  }

  initializeFormGroup() {
    this.form.setValue({
      'machinetype_id': null,
      'type': '',
      'description': '',


    });
  }


}



